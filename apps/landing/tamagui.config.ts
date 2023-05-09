import { createAnimations } from '@tamagui/animations-css';
import {
	createTamagui,
	createTheme,
	createTokens,
	TamaguiInternalConfig,
} from '@tamagui/core';
import { tokens as defaultTokens } from '@tamagui/themes';

import { fonts, media } from '../../tool/tamagui';

const animations = createAnimations({
	ultra: 'ease-in 50ms',
	fast: 'ease-in 150ms',
	medium: 'ease-in 300ms',
	slow: 'ease-in 450ms',
	crawl: 'ease-in 1000ms',
	mask: 'ease-in 250ms',
});

export const tokens = createTokens({
	color: {
		primary: '#19232c',
		text: '#fefefe',
		link: '#19A3E1',
		navigationText: '#fefefe',
		navigationBackground: '#162028',
	},
	size: defaultTokens.size,
	radius: defaultTokens.radius,
	space: defaultTokens.space,
	zIndex: defaultTokens.zIndex,
});

export const darkTheme = createTheme({
	background: tokens.color.primary,
	color: tokens.color.text,
	navigationFg: tokens.color.navigationText,
	navigationBg: tokens.color.navigationBackground,
});

export const lightTheme = createTheme({
	background: '#ffffff',
	color: '#222222',
	navigationFg: tokens.color.navigationText,
	navigationBg: tokens.color.navigationBackground,
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
