import { createAnimations } from '@tamagui/animations-css';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { createFont, createTamagui, TamaguiConfig } from 'tamagui';

const animations = createAnimations({
	fast: 'ease-in 150ms',
	medium: 'ease-in 300ms',
	slow: 'ease-in 450ms',
	'modal-mask': 'ease-in 250ms',
});

const fonts = {
	body: createFont({
		family: 'Arial',
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

const config: TamaguiConfig = createTamagui({
	themes,
	tokens,
	shorthands,
	animations,
	fonts,
});

export default config;
