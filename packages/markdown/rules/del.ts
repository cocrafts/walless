import { createElement } from 'react';
import { Text } from '@walless/gui';
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
				style: {
					textDecorationLine: 'line-through',
				},
			},
			output(node.content, state),
		);
	},
};

export default del;
