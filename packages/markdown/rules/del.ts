import { createElement } from 'react';
import { Text } from '@tamagui/core';
import {
	type ParserRule,
	type ReactOutputRule,
	defaultRules,
} from 'simple-markdown';

export const del: ParserRule & ReactOutputRule = {
	...defaultRules.del,
	react: (node, output, state) => {
		return createElement(
			Text,
			{
				key: state.key,
				textDecorationLine: 'line-through',
			},
			output(node.content, state),
		);
	},
};

export default del;
