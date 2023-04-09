import { createFont, createTokens } from '@tamagui/core';
import { tokens as defaultTokens } from '@tamagui/themes';

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

export const fonts = {
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
