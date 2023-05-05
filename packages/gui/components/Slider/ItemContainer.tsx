import { type FC, type ReactNode, useEffect } from 'react';
import { type LayoutRectangle, type ViewStyle } from 'react-native';
import {
	SharedValue,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { AnimatedView } from '@walless/gui';

import { SlideAnimator } from './shared';

interface Props {
	style?: ViewStyle;
	index: number;
	activatedIndex: number;
	children?: ReactNode;
	containerLayout: LayoutRectangle;
	animatedOffset: SharedValue<number>;
	animator: SlideAnimator;
}

export const ItemContainer: FC<Props> = ({
	style,
	index,
	activatedIndex,
	children,
	containerLayout,
	animatedOffset,
	animator,
}) => {
	const { width, height } = containerLayout;
	const progress = useSharedValue(1);

	const sizedStyle: ViewStyle = {
		position: 'absolute',
		top: 0,
		left: 0,
		width,
		height,
	};

	const animatedStyle = useAnimatedStyle(
		() =>
			animator({
				offset: animatedOffset,
				progress,
				index,
				activatedIndex,
				layout: containerLayout,
			}),
		[animatedOffset, progress, activatedIndex, containerLayout],
	);

	useEffect(() => {
		progress.value = withTiming(index === activatedIndex ? 1 : 0, {
			duration: 500,
		});
	}, [activatedIndex]);

	return (
		<AnimatedView style={[style, sizedStyle, animatedStyle]}>
			{children}
		</AnimatedView>
	);
};

export default ItemContainer;
