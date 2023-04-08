import { createElement } from 'react';
import { Text } from '@tamagui/core';
import {
	type ParserRule,
	type ReactOutputRule,
	defaultRules,
} from 'simple-markdown';

export const paragraph: ParserRule & ReactOutputRule = {
	...defaultRules.paragraph,
	react: (node, output, state) => {
		const { key } = state;

		return createElement(
			Text,
			{ key, marginVertical: 8 },
			output(node.content),
		);
	},
};

export default paragraph;
