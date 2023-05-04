import { type FC, type ReactNode } from 'react';
import { type LayoutRectangle, type ViewStyle } from 'react-native';
import {
	SharedValue,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { AnimatedView } from '@walless/gui';

import { SlideAnimator } from './shared';

interface Props {
	style?: ViewStyle;
	index: number;
	children?: ReactNode;
	containerLayout: LayoutRectangle;
	animatedOffset: SharedValue<number>;
	animator: SlideAnimator;
}

export const ItemContainer: FC<Props> = ({
	index,
	style,
	children,
	containerLayout,
	animatedOffset,
	animator,
}) => {
	const { width, height } = containerLayout;
	const progress = useSharedValue(0);
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
				layout: containerLayout,
			}),
		[animatedOffset, progress, containerLayout],
	);

	return (
		<AnimatedView style={[style, sizedStyle, animatedStyle]}>
			{children}
		</AnimatedView>
	);
};

export default ItemContainer;
