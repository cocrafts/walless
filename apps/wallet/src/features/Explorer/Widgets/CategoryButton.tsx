import type { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
	interpolateColor,
	useAnimatedStyle,
} from 'react-native-reanimated';
import type { WidgetType } from '@walless/core';

const AnimatedHoverable = Animated.createAnimatedComponent(TouchableOpacity);

interface AnimatedCategoryButtonProps {
	borderColor: string;
	color: string;
}

interface CategoryButtonProps {
	index: number;
	title: WidgetType;
	onPress: (index: number, category: WidgetType) => void;
	animatedValue: SharedValue<number>;
	inputRange: number[];
	outputRange: AnimatedCategoryButtonProps[];
}

const CategoryButton: FC<CategoryButtonProps> = ({
	index,
	title,
	onPress,
	inputRange,
	outputRange,
	animatedValue,
}) => {
	const activeColor = '#FFFFFF';
	const activeBorderColor = '#0694D3';
	const colorOutputRange = outputRange.map(({ color }) => color);
	const borderColorOutputRange = outputRange.map(
		({ borderColor }) => borderColor,
	);

	colorOutputRange[index] = activeColor;
	borderColorOutputRange[index] = activeBorderColor;

	const containerAnimatedStyle = useAnimatedStyle(() => {
		const borderColor = interpolateColor(
			animatedValue.value,
			inputRange,
			borderColorOutputRange,
		);

		return {
			borderColor,
		};
	}, [animatedValue]);

	const titleAnimatedStyle = useAnimatedStyle(() => {
		const color = interpolateColor(
			animatedValue.value,
			inputRange,
			colorOutputRange,
		);

		return {
			color,
		};
	}, [animatedValue]);

	return (
		<AnimatedHoverable
			style={[styles.container, containerAnimatedStyle]}
			onPress={() => onPress(index, title)}
		>
			<Animated.Text style={[styles.title, titleAnimatedStyle]}>
				{title}
			</Animated.Text>
		</AnimatedHoverable>
	);
};

export default CategoryButton;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 11,
		paddingVertical: 7,
		borderWidth: 1,
		borderRadius: 7,
	},
	title: {
		fontSize: 12,
	},
});
