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
		family: 'Rubik',
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
	media: {
		xs: { maxWidth: 660 },
		gtXs: { minWidth: 660 + 1 },
		sm: { maxWidth: 860 },
		gtSm: { minWidth: 860 + 1 },
		md: { maxWidth: 980 },
		gtMd: { minWidth: 980 + 1 },
		lg: { maxWidth: 1120 },
		gtLg: { minWidth: 1120 + 1 },
		short: { maxHeight: 820 },
		tall: { minHeight: 820 },
		hoverNone: { hover: 'none' },
		pointerCoarse: { pointer: 'coarse' },
	},
});

export default config;
