import { createAnimations } from '@tamagui/animations-css';
import { createTamagui, TamaguiInternalConfig } from '@tamagui/core';

import { darkTheme, fonts, lightTheme, tokens } from '../../tool/tamagui';

const animations = createAnimations({
	fast: 'ease-in 150ms',
	medium: 'ease-in 300ms',
	slow: 'ease-in 450ms',
	crawl: 'ease-in 1000ms',
	mask: 'ease-in 250ms',
});

export const config: TamaguiInternalConfig = createTamagui({
	defaultTheme: 'dark',
	themes: {
		dark: darkTheme,
		light: lightTheme,
	},
	fonts,
	tokens,
	animations,
});

export default config;
