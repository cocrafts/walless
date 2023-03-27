import { createElement } from 'react';
import { Text, TextStyle } from 'react-native';
import { defaultRules, ParserRule, ReactOutputRule } from 'simple-markdown';

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
