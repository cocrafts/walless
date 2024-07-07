import { ScrollView as ScrollViewNative } from 'react-native';
import type { GetProps } from '@tamagui/core';
import { styled } from '@tamagui/core';

import { fullscreenStyle } from './shared';

export const ScrollView = styled(
	ScrollViewNative,
	{
		name: 'ScrollView',
		scrollEnabled: true,

		variants: {
			fullscreen: {
				true: fullscreenStyle,
			},
		} as const,
	},
	{
		isReactNative: true,
	},
);

export type ScrollViewProps = GetProps<typeof ScrollView>;
