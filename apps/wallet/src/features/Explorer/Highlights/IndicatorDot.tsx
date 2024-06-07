import type { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
	interpolate,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

const AnimatedHoverable = Animated.createAnimatedComponent(TouchableOpacity);

interface IndicatorDotProps {
	index: number;
	onPress: (index: number) => void;
	data: number[];
	animatedValue: SharedValue<number>;
}

const IndicatorDot: FC<IndicatorDotProps> = ({
	index,
	onPress,
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

	const handleClick = () => {
		onPress(index);
		animatedValue.value = withTiming(index);
	};

	return (
		<AnimatedHoverable
			key={index.toString()}
			onPress={handleClick}
			style={styles.container}
		>
			<Animated.View style={[styles.indicator, animatedStyle]} />
		</AnimatedHoverable>
	);
};

export default IndicatorDot;

const styles = StyleSheet.create({
	container: {
		padding: 3,
	},
	indicator: {
		backgroundColor: '#0694D3',
		width: 6,
		height: 6,
		borderRadius: 6,
	},
});
