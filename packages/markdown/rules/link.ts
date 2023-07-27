import { createElement } from 'react';
import { Anchor } from '@walless/gui';
import type { ParserRule, ReactOutputRule } from 'simple-markdown';
import { defaultRules } from 'simple-markdown';

import type { MarkdownState } from '../utils/types';

export const link: ParserRule & ReactOutputRule = {
	...defaultRules.link,
	react: (node, output, state) => {
		const { config } = state as MarkdownState;
		const { colors } = config;

		return createElement(
			Anchor,
			{
				key: state.key,
				href: node.target,
			},
			output(node.content, { ...state, color: colors.link }),
		);
	},
};

export default link;
