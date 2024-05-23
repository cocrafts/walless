import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
	interpolate,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

const AnimatedHoverable = Animated.createAnimatedComponent(TouchableOpacity);

type IndicatorDotStyleProps = ViewStyle;

interface IndicatorDotProps {
	index: number;
	setActiveIndex: (index: number) => void;
	inputRange: number[];
	outputRange: IndicatorDotStyleProps[];
	animatedValue: SharedValue<number>;
}

const IndicatorDot: FC<IndicatorDotProps> = ({
	index,
	setActiveIndex,
	inputRange,
	outputRange,
	animatedValue,
}) => {
	const heightOutputRange = outputRange.map((output) => output.height);
	const opacityOutputRange = outputRange.map(() => 0.2);

	heightOutputRange[index] = 40;
	opacityOutputRange[index] = 1;

	const animatedStyle = useAnimatedStyle(() => {
		const height = interpolate(
			animatedValue.value,
			inputRange,
			heightOutputRange as number[],
		);

		const opacity = interpolate(
			animatedValue.value,
			inputRange,
			opacityOutputRange as number[],
		);

		return { height, opacity };
	}, [animatedValue]);

	const handleClick = () => {
		setActiveIndex(index);
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
