import React from 'react';
import { Text } from 'react-native';
import { defaultRules, ParserRule, ReactOutputRule } from 'simple-markdown';

export const strong: ParserRule & ReactOutputRule = {
	...defaultRules.strong,
	react: (node, output, state) => {
		return React.createElement(
			Text,
			{ key: state.key },
			output(node.content, { ...state, fontWeight: '500' }),
		);
	},
};

export default strong;
