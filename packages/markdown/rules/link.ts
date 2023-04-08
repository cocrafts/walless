import { createElement } from 'react';
import {
	type ParserRule,
	type ReactOutputRule,
	defaultRules,
} from 'simple-markdown';

import { Anchor } from '../components/Anchor';
import { MarkdownState } from '../utils/types';

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
