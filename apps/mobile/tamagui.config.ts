import { createAnimations } from '@tamagui/animations-reanimated';
import {
	createFont,
	createTamagui,
	TamaguiInternalConfig,
} from '@tamagui/core';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';

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
});

export default config;
