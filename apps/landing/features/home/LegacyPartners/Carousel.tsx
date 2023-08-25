import type { FC } from 'react';
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';
import type { ViewStyle } from 'react-native';
import { Image, Linking, StyleSheet } from 'react-native';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Hoverable, View } from '@walless/gui';

import { partners } from './internal';

interface Props {
	style?: ViewStyle;
	activeIndex: number;
	handleReachBounder: (isRightReach: boolean, isLeftReach: boolean) => void;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const Carousel: FC<Props> = forwardRef(function Carousel(
	{ style }: Props,
	ref,
) {
	const [autoSlideId, setAutoSlideId] = useState<NodeJS.Timer>();
	const layoutRef = useRef({
		itemWidth: 0,
		currentIndex: 0,
	});

	const currentPosition = useSharedValue(0);

	const handleSlideLeftToRight = () => {
		if (layoutRef.current.itemWidth === 0) return;

		if (layoutRef.current.currentIndex === 0) {
			layoutRef.current.currentIndex = partners.length;
			currentPosition.value =
				-layoutRef.current.currentIndex * layoutRef.current.itemWidth;
		}

		layoutRef.current.currentIndex -= 1;
		currentPosition.value = withTiming(
			-layoutRef.current.currentIndex * layoutRef.current.itemWidth,
			{ duration: 600, easing: Easing.bezier(0.41, 0.03, 0.33, 0.98) },
		);
	};

	const handleSlideRightToLeft = () => {
		// ignore the first render
		if (layoutRef.current.itemWidth === 0) return;

		if (layoutRef.current.currentIndex === partners.length) {
			layoutRef.current.currentIndex = 0;
			currentPosition.value = 0;
		}

		layoutRef.current.currentIndex += 1;
		currentPosition.value = withTiming(
			-(layoutRef.current.currentIndex * layoutRef.current.itemWidth),
			{ duration: 600, easing: Easing.bezier(0.41, 0.03, 0.33, 0.98) },
		);
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: currentPosition.value,
				},
			] as never[],
		};
	}, [currentPosition]);

	useEffect(() => {
		const autoSlide = setInterval(handleSlideRightToLeft, 2500);
		setAutoSlideId(autoSlide);

		return () => clearInterval(autoSlide);
	}, []);

	useImperativeHandle(ref, () => ({
		handleSlideLeftPress: () => {
			clearInterval(autoSlideId);
			handleSlideRightToLeft();
		},
		handleSlideRightPress: () => {
			clearInterval(autoSlideId);
			handleSlideLeftToRight();
		},
	}));

	return (
		<View
			horizontal
			style={{ overflow: 'hidden', alignSelf: 'flex-start', ...style }}
		>
			<AnimatedView horizontal style={animatedStyle}>
				{partners.map((partner, idx) => (
					<Hoverable key={idx} onPress={() => Linking.openURL(partner.url)}>
						<View
							onLayout={({ nativeEvent }) => {
								layoutRef.current.itemWidth = nativeEvent.layout.width;
							}}
						>
							<Image source={partner.uri} style={styles.image} />
						</View>
					</Hoverable>
				))}
			</AnimatedView>
			<AnimatedView horizontal style={animatedStyle}>
				{partners.map((partner, idx) => (
					<Hoverable key={idx} onPress={() => Linking.openURL(partner.url)}>
						<Image source={partner.uri} style={styles.image} />
					</Hoverable>
				))}
			</AnimatedView>
		</View>
	);
});

export default Carousel;

const styles = StyleSheet.create({
	image: {
		width: 200,
		height: 100,
		marginRight: 20,
		borderRadius: 10,
	},
});
