import { type FC } from 'react';
import { type LayoutRectangle, type ViewStyle } from 'react-native';
import { type SharedValue } from 'react-native-reanimated';

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

export type SlideAnimators = 'slide' | 'fade';

export const slideAnimators: Record<SlideAnimators, SlideAnimator> = {
	slide: ({ offset, index, layout }) => {
		const origin = layout.width * index;

		return {
			transform: [{ translateX: origin + offset.value }],
		};
	},
	fade: (progress) => ({}),
};
