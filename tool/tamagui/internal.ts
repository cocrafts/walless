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

export const media = {
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
};
