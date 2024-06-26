import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
	interpolate,
	useAnimatedStyle,
} from 'react-native-reanimated';

interface IndicatorDotProps {
	index: number;
	data: number[];
	animatedValue: SharedValue<number>;
}

const IndicatorDot: FC<IndicatorDotProps> = ({
	index,
	data,
	animatedValue,
}) => {
	const heightOutputRange = data.map(() => 6);
	const opacityOutputRange = data.map(() => 0.2);

	heightOutputRange[index] = 40;
	opacityOutputRange[index] = 1;

	const animatedStyle = useAnimatedStyle(() => {
		const height = interpolate(
			animatedValue.value,
			data,
			heightOutputRange as number[],
		);

		const opacity = interpolate(
			animatedValue.value,
			data,
			opacityOutputRange as number[],
		);

		return { height, opacity };
	}, [animatedValue]);

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
	},
});
