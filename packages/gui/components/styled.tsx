import {
	Stack as TamaguiStack,
	styled,
	Text as TamaguiText,
} from '@tamagui/core';

import { fullscreenStyle } from './shared';

export const Stack = styled(TamaguiStack, {
	variants: {
		fullscreen: {
			true: fullscreenStyle,
		},
		horizontal: {
			true: {
				flexDirection: 'row',
			},
		},
	} as const,
});

export const Circle = styled(TamaguiStack, {
	name: 'Circle',
	borderRadius: 10000000,
});

export const Text = styled(TamaguiText, {
	name: 'Text',
	color: '#dedede',
	fontFamily: 'Rubik',
});
