import { createElement } from 'react';
import { Text } from '@tamagui/core';
import {
	type ParserRule,
	type ReactOutputRule,
	defaultRules,
} from 'simple-markdown';

export const strong: ParserRule & ReactOutputRule = {
	...defaultRules.strong,
	react: (node, output, state) => {
		return createElement(
			Text,
			{ key: state.key },
			output(node.content, { ...state, fontWeight: '600' }),
		);
	},
};

export default strong;
