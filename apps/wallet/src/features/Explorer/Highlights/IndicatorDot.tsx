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
		const { height, opacity } =
			index === currentIndex ? styles.highlightedIndicator : styles.indicator;

		const config: WithTimingConfig = { duration: 650 };

		return {
			height: withTiming(height, config),
			opacity: withTiming(opacity, config),
		};
	}, [currentIndex]);

	return <Animated.View style={[styles.indicator, animatedStyle]} />;
};

export default IndicatorDot;

const styles = StyleSheet.create({
	indicator: {
		backgroundColor: '#0694D3',
		width: 6,
		height: 6,
		borderRadius: 6,
		margin: 4,
		opacity: 0.2,
	},
	highlightedIndicator: {
		height: 40,
		opacity: 1,
	},
});
