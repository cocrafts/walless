import { createElement } from 'react';
import { type TextStyle, Text } from 'react-native';
import {
	type ParserRule,
	type ReactOutputRule,
	defaultRules,
} from 'simple-markdown';

export const paragraph: ParserRule & ReactOutputRule = {
	...defaultRules.paragraph,
	react: (node, output, state) => {
		const { key } = state;

		const style: TextStyle = {
			marginVertical: 8,
		};

		return createElement(Text, { key, style }, output(node.content));
	},
};

export default paragraph;
