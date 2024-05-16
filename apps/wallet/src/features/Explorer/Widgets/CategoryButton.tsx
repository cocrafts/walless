import type { FC } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

const AnimatedHoverable = Animated.createAnimatedComponent(TouchableOpacity);

interface AnimatedCategoryButtonProps {
	borderColor: string;
	color: string;
}

interface CategoryButtonProps {
	index: number;
	title: string;
	onPress: (index: number) => void;
	scrollXAnimated: Animated.Value;
	inputRange: number[];
	outputRange: AnimatedCategoryButtonProps[];
}

const CategoryButton: FC<CategoryButtonProps> = ({
	index,
	title,
	onPress,
	inputRange,
	outputRange,
	scrollXAnimated,
}) => {
	const activeColor = '#FFFFFF';
	const activeBorderColor = '#0694D3';
	const colorOutputRange = outputRange.map(({ color }) => color);
	const borderColorOutputRange = outputRange.map(
		({ borderColor }) => borderColor,
	);

	colorOutputRange[index] = activeColor;
	borderColorOutputRange[index] = activeBorderColor;

	const color = scrollXAnimated.interpolate({
		inputRange,
		outputRange: colorOutputRange,
	});
	const borderColor = scrollXAnimated.interpolate({
		inputRange,
		outputRange: borderColorOutputRange,
	});

	const containerAnimatedStyle = {
		borderColor,
	};
	const titleAnimatedStyle = {
		color,
	};

	return (
		<AnimatedHoverable
			style={[styles.container, containerAnimatedStyle]}
			onPress={() => onPress(index)}
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
