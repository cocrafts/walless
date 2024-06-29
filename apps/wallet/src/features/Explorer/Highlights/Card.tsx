import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { SharedValue, WithTimingConfig } from 'react-native-reanimated';
import Animated, {
	interpolate,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import type { WidgetDocument } from '@walless/store';

import HighlightItem from './HighlightItem';

interface Props {
	widget: WidgetDocument;
	index: number;
	currentIndex: number;
	dataLength: number;
	xOffsetShareValue: SharedValue<number>;
}
const Card: FC<Props> = ({
	widget,
	index,
	currentIndex,
	dataLength,
	xOffsetShareValue,
}) => {
	const onSwipeAnimatedStyle = useAnimatedStyle(() => {
		const scale = interpolate(index - currentIndex, [0, dataLength], [1, 0.08]);
		const toCurrent = index === currentIndex;
		const toHidden = index < currentIndex || index - currentIndex > 2;

		const config: WithTimingConfig = { duration: 650 };

		return {
			opacity: toCurrent
				? withTiming(1, config)
				: toHidden
					? withTiming(0, config)
					: 1,
			transform: [
				{ translateX: withTiming((index - currentIndex) * 34, config) },
				{ scale: withTiming(scale, config) },
			],
		};
	}, [currentIndex]);

	const dragAnimatedStyle = useAnimatedStyle(() => {
		const defaultTranslateX = (index - currentIndex) * 34;
		const defaultScale = interpolate(
			index - currentIndex,
			[0, dataLength],
			[1, 0.08],
		);

		return {
			transform: [
				{ translateX: xOffsetShareValue.value + defaultTranslateX },
				{ scale: defaultScale },
			],
		};
	}, [xOffsetShareValue, currentIndex]);

	const containerStyle = { zIndex: -index };

	return (
		<Animated.View
			style={[
				containerStyle,
				dragAnimatedStyle,
				onSwipeAnimatedStyle,
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
