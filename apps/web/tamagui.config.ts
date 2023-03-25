import { createAnimations } from '@tamagui/animations-reanimated';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { createFont, createTamagui } from 'tamagui';

export default createTamagui({
	themes,
	tokens,
	shorthands,
	animations: createAnimations({
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
	}),
	fonts: {
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
	},
});
