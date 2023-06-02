import { createElement } from 'react';
import { Text } from '@walless/gui';
import {
	type ParserRule,
	type ReactOutputRule,
	defaultRules,
} from 'simple-markdown';

export const em: ParserRule & ReactOutputRule = {
	...defaultRules.em,
	react: (node, output, state) => {
		return createElement(
			Text,
			{ key: state.key },
			output(node.content, { ...state, fontStyle: 'italic' }),
		);
	},
};

export default em;
