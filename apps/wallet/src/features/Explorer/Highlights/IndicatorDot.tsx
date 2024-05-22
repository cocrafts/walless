import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

const AnimatedHoverable = Animated.createAnimatedComponent(TouchableOpacity);

type IndicatorDotStyleProps = ViewStyle;

interface IndicatorDotProps {
	index: number;
	setActiveIndex: (index: number) => void;
	scrollXAnimated: Animated.Value;
	inputRange: number[];
	outputRange: IndicatorDotStyleProps[];
}

const IndicatorDot: FC<IndicatorDotProps> = ({
	index,
	setActiveIndex,
	scrollXAnimated,
	inputRange,
	outputRange,
}) => {
	const activeBackgroundColor = '#0694D3';

	const backgroundColorOutputRange = outputRange.map(
		(output) => output.backgroundColor,
	);
	backgroundColorOutputRange[index] = activeBackgroundColor;

	const backgroundColor = scrollXAnimated.interpolate({
		inputRange,
		outputRange: backgroundColorOutputRange as string[],
	});

	const animatedStyle = {
		backgroundColor,
	};

	return (
		<AnimatedHoverable
			key={index.toString()}
			onPress={() => setActiveIndex(index)}
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
		backgroundColor: '#566674',
		width: 6,
		height: 6,
		borderRadius: 6,
	},
});
