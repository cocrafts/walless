import { createAnimations } from '@tamagui/animations-css';
import {
	createFont,
	createTamagui,
	TamaguiInternalConfig,
} from '@tamagui/core';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';

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

export const config: TamaguiInternalConfig = createTamagui({
	themes,
	tokens,
	shorthands,
	animations,
	fonts,
});

export default config;
