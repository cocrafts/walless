import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { WithTimingConfig } from 'react-native-reanimated';
import Animated, {
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

interface IndicatorDotProps {
	index: number;
	currentIndex: number;
}

const IndicatorDot: FC<IndicatorDotProps> = ({ index, currentIndex }) => {
	const animatedStyle = useAnimatedStyle(() => {
		const { width, opacity } =
			index === currentIndex ? styles.highlightedIndicator : styles.indicator;

		const config: WithTimingConfig = { duration: 650 };

		return {
			width: withTiming(width, config),
			opacity: withTiming(opacity, config),
		};
	}, [currentIndex]);

	return <Animated.View style={[styles.indicator, animatedStyle]} />;
};

export default IndicatorDot;

const styles = StyleSheet.create({
	indicator: {
		backgroundColor: '#FFFFFF',
		width: 7,
		height: 7,
		borderRadius: 6,
		opacity: 0.2,
	},
	highlightedIndicator: {
		width: 40,
		opacity: 1,
	},
});
