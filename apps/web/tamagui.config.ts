import { createAnimations } from '@tamagui/animations-css';
import {
	type TamaguiInternalConfig,
	createTamagui,
	createTheme,
	createTokens,
} from '@tamagui/core';
import { tokens as defaultTokens } from '@tamagui/themes';

import { fonts, media } from '../../tool/tamagui';

const animations = createAnimations({
	fast: 'ease-in 150ms',
	medium: 'ease-in 300ms',
	slow: 'ease-in 450ms',
	crawl: 'ease-in 1000ms',
	mask: 'ease-in 250ms',
});

export const tokens = createTokens({
	color: {
		primary: '#011726',
		primary2: '#131C24',
		primary3: '#19232C',
		text: '#fefefe',
		warning: '#DE4747',
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
