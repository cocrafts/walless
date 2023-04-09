import { createTokens } from '@tamagui/core';
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
