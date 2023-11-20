import type { FC, ReactElement } from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
	Easing,
	ReduceMotion,
	useAnimatedStyle,
	useSharedValue,
	withDecay,
	withTiming,
} from 'react-native-reanimated';
import { View } from '@walless/gui';

const AnimatedView = Animated.createAnimatedComponent(View);

interface Props<T = unknown> {
	style?: ViewStyle;
	loop?: boolean;
	gestureEnabled?: boolean;
	itemWidth: number;
	data: T[];
	renderItem: (props: T, index: number) => ReactElement;
}

const velocityLimit = 1;

export const Carousel: FC<Props> = forwardRef(function Carousel(
	{
		style,
		loop = false,
		gestureEnabled = false,
		itemWidth,
		data,
		renderItem,
	}: Props,
	ref,
) {
	const dataClone = loop ? data.concat(data) : data;
	const layoutRef = useRef({
		carouselLength: dataClone.length * itemWidth,
		currentIndex: 0,
	});
	const currentPosition = useSharedValue(0);
	const containerWidth = useSharedValue(0);
	const context = useSharedValue({ x: 0 });
	const withTimingConfig = {
		duration: 600,
		easing: Easing.bezier(0.41, 0.03, 0.33, 0.98),
		reduceMotion: ReduceMotion.Never,
	};

	const handleSlideToRight = () => {
		if (layoutRef.current.currentIndex === 0) {
			currentPosition.value = -layoutRef.current.currentIndex * itemWidth;
		}

		layoutRef.current.currentIndex -= 1;
		currentPosition.value = withTiming(
			-layoutRef.current.currentIndex * itemWidth,
			withTimingConfig,
		);
	};

	const handleSlideToLeft = () => {
		if (layoutRef.current.currentIndex === data.length) {
			currentPosition.value = 0;
		}

		layoutRef.current.currentIndex += 1;
		currentPosition.value = withTiming(
			-layoutRef.current.currentIndex * itemWidth,
			withTimingConfig,
		);
	};

	const handleSlideToIndex = (index: number) => {
		const newPosition = -index * itemWidth;
		layoutRef.current.currentIndex = index;
		currentPosition.value = withTiming(newPosition, withTimingConfig);
	};

	const leftLimit = itemWidth / 2;
	const rightLimit =
		-layoutRef.current.carouselLength + containerWidth.value - itemWidth / 2;

	const drag = Gesture.Pan()
		.onStart(() => {
			context.value.x = currentPosition.value;
		})
		.onUpdate((event) => {
			const newPosition = event.translationX + context.value.x;
			const isOutLimit = newPosition > leftLimit || newPosition < rightLimit;

			if (!isOutLimit) {
				currentPosition.value = newPosition;
			}
		})
		.onEnd((event) => {
			const velocity =
				event.velocityX < -velocityLimit
					? -velocityLimit
					: event.velocityX > velocityLimit
					  ? velocityLimit
					  : event.velocityX;

			currentPosition.value = withDecay({
				velocity,
				clamp: [-layoutRef.current.carouselLength + containerWidth.value, 0],
				rubberBandEffect: true,
				reduceMotion: ReduceMotion.System,
			});
		})
		.enabled(gestureEnabled);

	useImperativeHandle(ref, () => ({
		toLeft: () => {
			handleSlideToLeft();
		},
		toRight: () => {
			handleSlideToRight();
		},
		toIndex: (index: number) => {
			handleSlideToIndex(index);
		},
	}));

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: currentPosition.value,
				},
			] as never[],
		};
	}, [currentPosition]);

	return (
		<View
			style={style}
			onLayout={({ nativeEvent }) => {
				containerWidth.value = nativeEvent.layout.width;
			}}
		>
			<View style={styles.container}>
				<GestureHandlerRootView>
					<GestureDetector gesture={drag}>
						<AnimatedView horizontal style={animatedStyle}>
							{dataClone.map((item, index) => renderItem(item, index))}
						</AnimatedView>
					</GestureDetector>
				</GestureHandlerRootView>
			</View>
		</View>
	);
});

export default Carousel;

const styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
		alignSelf: 'flex-start',
	},
});
