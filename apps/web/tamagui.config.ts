import { createAnimations } from '@tamagui/animations-reanimated';
import {
	createTamagui,
	createTheme,
	createTokens,
	TamaguiInternalConfig,
} from '@tamagui/core';
import { tokens as defaultTokens } from '@tamagui/themes';

import { fonts, media } from '../../tool/tamagui';

const animations = createAnimations({
	fast: {
		type: 'spring',
		damping: 20,
		mass: 1.2,
		stiffness: 250,
	},
	medium: {
		type: 'spring',
		damping: 10,
		mass: 0.9,
		stiffness: 100,
	},
	slow: {
		type: 'spring',
		damping: 20,
		stiffness: 60,
	},
});

export const tokens = createTokens({
	color: {
		primary: '#011726',
		text: '#fefefe',
	},
	size: defaultTokens.size,
	radius: defaultTokens.radius,
	space: defaultTokens.space,
	zIndex: defaultTokens.zIndex,
});

export const darkTheme = createTheme({
	background: tokens.color.primary,
	color: tokens.color.text,
});

export const lightTheme = createTheme({
	background: '#ffffff',
	color: '#222222',
});

export const config: TamaguiInternalConfig = createTamagui({
	tokens,
	themes: {
		dark: darkTheme,
		light: lightTheme,
	},
	fonts,
	media,
	animations,
});

export default config;
