import type { FC } from 'react';
import type { LayoutRectangle, ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import { interpolate } from 'react-native-reanimated';

export interface SliderHandle {
	slideNext: () => void;
	slideBack: () => void;
	slideTo: (index: number) => void;
}

export interface SlideComponentProps {
	item: SlideOption;
	navigator: SliderHandle;
	activedId: string;
}

export interface SlideOption {
	id: string;
	component: FC<SlideComponentProps>;
}

export type SlideAnimator = (context: {
	index: number;
	activatedIndex: number;
	offset: SharedValue<number>;
	progress: SharedValue<number>;
	layout: LayoutRectangle;
}) => ViewStyle;

export type SlideAnimators = 'fade' | 'bounce' | 'fancy';

export const slideAnimators: Record<SlideAnimators, SlideAnimator> = {
	fade: ({ progress, index, activatedIndex, layout }) => {
		const origin = layout.width * index;
		const offset = layout.width * activatedIndex;
		const translateY = interpolate(progress.value, [0, 1], [10, 0]);

		return {
			opacity: progress.value,
			transform: [{ translateX: origin - offset }, { translateY }],
		};
	},
	bounce: ({ offset, index, layout }) => {
		const origin = layout.width * index;

		return {
			transform: [{ translateX: origin + offset.value }],
		};
	},
	fancy: ({ offset, progress, index, layout }) => {
		const origin = layout.width * index;

		return {
			overflow: 'hidden',
			borderRadius: interpolate(progress.value, [0, 1], [100, 20]),
			opacity: progress.value,
			transform: [
				{ translateX: origin + offset.value },
				{ scale: progress.value },
			],
		};
	},
};
