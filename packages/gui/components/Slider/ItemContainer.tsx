import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import type { LayoutRectangle, View, ViewStyle } from 'react-native';
import type { AnimatedStyleProp, SharedValue } from 'react-native-reanimated';
import {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { AnimatedView } from '@walless/gui';

import type { SlideAnimator } from './shared';

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

	const animatedStyle = useAnimatedStyle(() => {
		return runOnJS(animator)({
			offset: animatedOffset,
			progress,
			index,
			activatedIndex,
			layout: containerLayout,
		}) as unknown as AnimatedStyleProp<ViewStyle>;
	}, [animatedOffset, progress, activatedIndex, containerLayout]);

	useEffect(() => {
		progress.value = withTiming(index === activatedIndex ? 1 : 0, {
			duration: 500,
		});
	}, [activatedIndex]);

	return (
		<AnimatedView
			style={[
				style as AnimatedStyleProp<ViewStyle>,
				sizedStyle as AnimatedStyleProp<ViewStyle>,
				animatedStyle,
			]}
		>
			{children}
		</AnimatedView>
	);
};

export default ItemContainer;
