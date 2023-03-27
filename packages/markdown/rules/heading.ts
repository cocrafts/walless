import { createElement } from 'react';
import { Text, TextStyle } from 'react-native';
import { MarkdownState } from 'components/Markdown/internal';
import {
	blockRegex,
	defaultRules,
	ParserRule,
	ReactOutputRule,
} from 'simple-markdown';

export const heading: ParserRule & ReactOutputRule = {
	...defaultRules.heading,
	match: blockRegex(/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n *)+/),
	react: (node, output, state) => {
		const { key, config } = state as MarkdownState;
		const { fontSize: baseFontSize } = config;
		const levelSizes = makeLevelSizes(baseFontSize);
		const fontSize = levelSizes[node.level as never] || 8;
		const fontWeight = '600';
		const style: TextStyle = {
			lineHeight: fontSize * 1.2,
			marginVertical: fontSize / 2,
		};

		return createElement(
			Text,
			{ key, style },
			output(node.content, { ...state, fontSize, fontWeight }),
		);
	},
};

export default heading;

export const makeLevelSizes = (baseSize: number, step = 3) => {
	const sizes: Record<string, number> = {};

	for (let i = 6; i > 0; i -= 1) {
		sizes[i] = baseSize + (i - 1) * step;
	}

	return sizes;
};
