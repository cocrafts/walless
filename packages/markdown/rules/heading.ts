import { createElement } from 'react';
import { Text } from '@walless/gui';
import {
	type ParserRule,
	type ReactOutputRule,
	blockRegex,
	defaultRules,
} from 'simple-markdown';

import { type MarkdownState } from '../utils/types';

export const heading: ParserRule & ReactOutputRule = {
	...defaultRules.heading,
	match: blockRegex(/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n *)+/),
	react: (node, output, state) => {
		const { key, config } = state as MarkdownState;
		const { fontSize: baseFontSize } = config;
		const levelSizes = makeLevelSizes(baseFontSize);
		const fontSize = levelSizes[node.level as never] || 8;
		const fontWeight = '600';

		return createElement(
			Text,
			{
				key,
				style: { lineHeight: fontSize * 1.2, marginVertical: fontSize / 2 },
			},
			output(node.content, { ...state, fontSize, fontWeight }),
		);
	},
};

export default heading;

export const makeLevelSizes = (
	baseSize: number,
	step = 3,
	variantCount = 6,
) => {
	const maxSize = baseSize + step * variantCount;
	const sizes: Record<string, number> = {};

	for (let i = 0; i < variantCount; i += 1) {
		sizes[i] = maxSize - (i - 1) * step;
	}

	return sizes;
};
