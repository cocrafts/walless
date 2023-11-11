import type { FC } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
	Extrapolation,
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import { Hoverable } from '@walless/gui';

interface Props {
	dotSize: number;
	dotColor: { inActive: string; active: string };
	index: number;
	currentIndex: SharedValue<number>;
	carouselItemWidth?: number;
	onPress?: (index: number) => void;
}

const AnimatedHoverable = Animated.createAnimatedComponent(Hoverable);

export const PaginatedItem: FC<Props> = ({
	dotSize,
	dotColor,
	index,
	currentIndex,
	carouselItemWidth,
	onPress,
}) => {
	const dotStyle = {
		height: dotSize,
		marginHorizontal: 5,
		borderRadius: dotSize / 2,
		backgroundColor: dotColor.inActive,
	};

	const width = carouselItemWidth || 1;

	const dotAnimatedStyle = useAnimatedStyle(() => {
		const widthAnimation = interpolate(
			currentIndex.value * width,
			[(index - 1) * width, index * width, (index + 1) * width],
			[dotSize, dotSize * 4, dotSize],
			Extrapolation.CLAMP,
		);

		const backgroundColorAnimation = interpolateColor(
			currentIndex.value * width,
			[(index - 1) * width, index * width, (index + 1) * width],
			[dotColor.inActive, dotColor.active, dotColor.inActive],
		);

		return {
			width: withTiming(widthAnimation),
			backgroundColor: backgroundColorAnimation,
		};
	}, [currentIndex]);

	return (
		<AnimatedHoverable
			style={[dotStyle, dotAnimatedStyle]}
			onPress={() => {
				currentIndex.value = index;
				onPress?.(index);
			}}
		/>
	);
};

export default PaginatedItem;
