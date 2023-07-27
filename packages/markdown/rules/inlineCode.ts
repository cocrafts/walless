import { createElement } from 'react';
import { Text } from '@walless/gui';
import { transparentize } from 'color2k';
import type { ParserRule, ReactOutputRule } from 'simple-markdown';
import { defaultRules } from 'simple-markdown';

import type { MarkdownConfig } from '../utils/types';

export const inlineCode: ParserRule & ReactOutputRule = {
	...defaultRules.inlineCode,
	react: (node, output, state) => {
		const { color, config } = state;
		const { dark, fontFamily, fontSize, colors }: MarkdownConfig = config;
		const transparentAmount = dark ? 0.5 : 0.8;

		return createElement(
			Text,
			{
				key: state.key,
				style: {
					fontFamily,
					fontWeight: '400',
					fontSize,
					backgroundColor: transparentize(
						colors.alt as never,
						transparentAmount,
					),
					borderRadius: 6,
					paddingHorizontal: 5,
					marginHorizontal: 2,
					color: color || colors.text,
				},
			},
			node.content,
		);
	},
};

export default inlineCode;
