import { createAnimations } from '@tamagui/animations-css';
import {
	createFont,
	createTamagui,
	createTokens,
	TamaguiInternalConfig,
} from '@tamagui/core';

const animations = createAnimations({
	fast: 'ease-in 150ms',
	medium: 'ease-in 300ms',
	slow: 'ease-in 450ms',
	crawl: 'ease-in 1000ms',
	mask: 'ease-in 250ms',
});

const fonts = {
	body: createFont({
		family: 'Poppins',
		size: {
			4: 14,
		},
		lineHeight: {
			4: 16,
		},
		letterSpacing: {
			4: 1,
		},
		weight: {
			4: 400,
		},
	}),
};

const tokens = createTokens({
	color: {
		primary: '#000',
	},
	size: {},
	radius: {},
	space: {},
	zIndex: {},
});

const themes = {
	dark: {
		background: '#011726',
		color: '#dadada',
	},
	light: {
		color: '#383838',
		background: '#fff',
	},
};

export const config: TamaguiInternalConfig = createTamagui({
	defaultTheme: 'dark',
	themes,
	tokens,
	animations,
	fonts,
});

export default config;
