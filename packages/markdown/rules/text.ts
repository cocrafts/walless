import { createElement } from 'react';
import { Text } from 'react-native';
import type { ParserRule, ReactOutputRule } from 'simple-markdown';
import { defaultRules } from 'simple-markdown';

import type { MarkdownState } from '../utils/types';

export const text: ParserRule & ReactOutputRule = {
	...defaultRules.text,
	react: (node, output, state) => {
		const { key, color, fontWeight, fontStyle, config } =
			state as MarkdownState;
		const { fontFamily, colors } = config;

		return createElement(
			Text,
			{
				key,
				style: {
					fontFamily,
					fontSize: state.fontSize || config.fontSize,
					lineHeight: config.fontSize * 1.2,
					fontWeight: fontWeight || config.fontWeight || '400',
					fontStyle: fontStyle || 'normal',
					color: color || colors.text,
				},
			},
			node.content,
		);
	},
};

export default text;
