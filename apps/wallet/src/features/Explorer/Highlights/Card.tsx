import { type FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import type { SharedValue, WithTimingConfig } from 'react-native-reanimated';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import type { WidgetDocument } from '@walless/store';

import HighlightItem from './HighlightItem';
import { MAX_X_OFFSET } from './shared';

interface Props {
	widget: WidgetDocument;
	index: number;
	currentIndex: number;
	dataLength: number;
	dragXOffset: SharedValue<number>;
}

const timingConfig: WithTimingConfig = { duration: 650 };

const Card: FC<Props> = ({
	widget,
	index,
	currentIndex,
	dataLength,
	dragXOffset,
}) => {
	const xOffset = useSharedValue(0);
	const scale = useSharedValue(1);
	const opacity = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => {
		const addingTranslateX = interpolate(
			index - currentIndex,
			[dataLength - currentIndex, 0],
			[0, dragXOffset.value],
		);

		const addingScale = interpolate(
			dragXOffset.value,
			[-MAX_X_OFFSET, MAX_X_OFFSET],
			[0.08, -0.08],
		);

		return {
			opacity: opacity.value,
			transform: [
				{ translateX: xOffset.value + addingTranslateX },
				{ scale: scale.value + addingScale },
			],
		};
	}, [xOffset, scale, opacity, dragXOffset, currentIndex]);

	const handleSwipe = () => {
		if (index >= currentIndex) {
			const newScale = interpolate(
				index - currentIndex,
				[0, dataLength],
				[1, 0.08],
			);
			scale.value = withTiming(newScale, timingConfig);
		} else if (currentIndex - index === 1) {
			scale.value = withTiming(scale.value + 0.2, timingConfig);
		}

		const isPopped = index < currentIndex;
		xOffset.value = withTiming(
			isPopped ? -200 : (index - currentIndex) * 34,
			timingConfig,
		);

		const toCurrent = index === currentIndex;
		const toPopped = index < currentIndex;
		const toHidden = toPopped || index - currentIndex > 2;
		if (toCurrent) {
			opacity.value = withTiming(1, timingConfig);
		} else if (toHidden) {
			opacity.value = withTiming(0, timingConfig);
		} else {
			opacity.value = 1;
		}
	};

	const containerStyle = { zIndex: -index };

	useEffect(handleSwipe, [currentIndex]);

	return (
		<Animated.View
			style={[
				containerStyle,
				animatedStyle,
				index !== currentIndex && styles.absolute,
			]}
		>
			<HighlightItem widget={widget} />
		</Animated.View>
	);
};

export default Card;

const styles = StyleSheet.create({
	absolute: {
		position: 'absolute',
	},
});
