import { type FC } from 'react';
import { type LayoutRectangle, type ViewStyle } from 'react-native';
import { type SharedValue, interpolate } from 'react-native-reanimated';

export interface SlideOption {
	id: string;
	component: FC<{ item: SlideOption }>;
}

export type SlideAnimator = (context: {
	index: number;
	offset: SharedValue<number>;
	progress: SharedValue<number>;
	layout: LayoutRectangle;
}) => ViewStyle;

export type SlideAnimators = 'basic' | 'fade' | 'fancy';

export const slideAnimators: Record<SlideAnimators, SlideAnimator> = {
	basic: ({ offset, index, layout }) => {
		const origin = layout.width * index;

		return {
			transform: [{ translateX: origin + offset.value }],
		};
	},
	fade: ({ offset, progress, index, layout }) => {
		const origin = layout.width * index;

		return {
			opacity: progress.value,
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
