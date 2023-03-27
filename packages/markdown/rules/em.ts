import React from 'react';
import { Text } from 'react-native';
import { defaultRules, ParserRule, ReactOutputRule } from 'simple-markdown';

export const em: ParserRule & ReactOutputRule = {
	...defaultRules.em,
	react: (node, output, state) => {
		return React.createElement(
			Text,
			{ key: state.key },
			output(node.content, { ...state, fontStyle: 'italic' }),
		);
	},
};

export default em;
