import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import type { WidgetDocument } from '@walless/store';

import HighlightItem, { ITEM_WIDTH } from './HighlightItem';

interface Props {
	widget: WidgetDocument;
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
	widget,
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
			translateX.value = withTiming(offsetX.value - ITEM_WIDTH);

		if (currentIndex > index) {
			translateX.value =
				-(currentIndex - index) * 80 - ITEM_WIDTH + offsetX.value;
		}

		if (currentIndex < index) {
			const offsetXValue = offsetX.value < -50 ? -50 : offsetX.value;
			translateX.value = interpolate(
				animatedValue.value,
				[index - 1, index],
				[50 + offsetXValue, 0 + offsetXValue],
			);
		}

		if (currentIndex >= index) scale.value = 1;
		else
			scale.value = interpolate(
				animatedValue.value,
				[index - 1, index],
				[0.75, 1],
			);

		if (currentIndex === index || index < maxItems + currentIndex)
			opacity.value = 1;
		else
			opacity.value = interpolate(
				animatedValue.value,
				[index - 1, index],
				[1 - 1 / maxItems, 1],
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
		zIndex: dataLength - index,
	};

	const pan = Gesture.Pan()
		.onUpdate((event) => {
			if (currentIndex !== index) return;
			animatedValue.value = interpolate(
				Math.abs(event.translationX),
				[0, ITEM_WIDTH],
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

			if (event.translationX < -30) {
				translateX.value = -303;
				onSwipeLeft();
			} else if (event.translationX > 30) {
				translateX.value = 30;
				onSwipeRight();
			}

			offsetX.value = 0;
		});

	return (
		<GestureDetector gesture={pan}>
			<Animated.View
				style={[
					styles.container,
					index !== currentIndex && styles.absolute,
					containerStyle,
					animatedStyle,
				]}
			>
				<HighlightItem widget={widget} />
			</Animated.View>
		</GestureDetector>
	);
};

export default Card;

const styles = StyleSheet.create({
	container: {
		width: ITEM_WIDTH,
		height: 200,
		borderRadius: 16,
	},
	absolute: {
		position: 'absolute',
	},
});
