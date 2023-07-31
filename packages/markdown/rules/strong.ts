import { createElement } from 'react';
import { Text } from 'react-native';
import type { ParserRule, ReactOutputRule } from 'simple-markdown';
import { defaultRules } from 'simple-markdown';

export const strong: ParserRule & ReactOutputRule = {
	...defaultRules.strong,
	react: (node, output, state) => {
		return createElement(
			Text,
			{
				key: state.key,
			},
			output(node.content, { ...state, fontWeight: '500' }),
		);
	},
};

export default strong;
