import type { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

interface Props {
	color: string;
	title: string;
	index: number;
	dataLength: number;
	maxItems: number;
	currentIndex: number;
	animatedValue: SharedValue<number>;
	onSwipeLeft: () => void;
	onSwipeRight: () => void;
	offsetX: SharedValue<number>;
}
const Card: FC<Props> = ({
	color,
	title,
	dataLength,
	index,
	maxItems,
	currentIndex,
	animatedValue,
	onSwipeLeft,
	onSwipeRight,
	offsetX,
}) => {
	const translateX = useSharedValue(0);
	const opacity = useSharedValue(0);
	const scale = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		if (currentIndex === index && offsetX.value === 0)
			translateX.value = withTiming(0, {
				duration: 600,
			});
		if (index + 1 === currentIndex && offsetX.value > 0)
			translateX.value = withTiming(offsetX.value - 273);
		if (currentIndex > index) {
			translateX.value = -(currentIndex - index) * 80 - 273 + offsetX.value;
		}
		if (currentIndex < index) {
			const offsetXValue = offsetX.value < -30 ? -30 : offsetX.value;
			translateX.value = interpolate(
				animatedValue.value,
				[index - 1, index],
				[30 + offsetXValue, 0 + offsetXValue],
			);
		}

		if (currentIndex >= index) scale.value = 1;
		else
			scale.value = interpolate(
				animatedValue.value,
				[index - 1, index],
				[0.9, 1],
			);

		if (currentIndex === index || index < maxItems + currentIndex)
			opacity.value = 1;
		else
			opacity.value = interpolate(
				animatedValue.value,
				[index - 1, index],
				[1 - 0.5 / maxItems, 1],
			);

		return {
			transform: [
				{
					translateX: translateX.value,
				},
				{ scale: scale.value },
			],
			opacity: opacity.value,
		};
	}, [translateX, animatedValue, offsetX, currentIndex]);

	const containerStyle = {
		backgroundColor: color,
		zIndex: dataLength - index,
	};

	const pan = Gesture.Pan()
		.onUpdate((event) => {
			if (currentIndex !== index) return;
			animatedValue.value = interpolate(
				Math.abs(event.translationX),
				[0, 273],
				[index, index + 1],
			);
			translateX.value = event.translationX;
			offsetX.value = event.translationX;
		})
		.onFinalize((event) => {
			if (index === dataLength - 1 && event.translationX < 0) {
				translateX.value = withTiming(0, { duration: 500 });
				offsetX.value = 0;
				return;
			}
			if (index === 0 && event.translationX > 0) {
				translateX.value = withTiming(0, { duration: 500 });
				offsetX.value = withTiming(0, { duration: 600 });
				return;
			}

			if (event.translationX < -50) {
				translateX.value = -303;
				onSwipeLeft();
			} else if (event.translationX > 50) {
				translateX.value = 30;
				onSwipeRight();
			}

			offsetX.value = 0;
		});

	return (
		<GestureDetector gesture={pan}>
			<Animated.View style={[styles.container, containerStyle, animatedStyle]}>
				<Text>{title}</Text>
			</Animated.View>
		</GestureDetector>
	);
};

export default Card;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: 273,
		height: 150,
		borderRadius: 16,
		padding: 16,
	},
});
