import React from 'react';
import { Text } from 'react-native';
import { defaultRules, ParserRule, ReactOutputRule } from 'simple-markdown';

export const del: ParserRule & ReactOutputRule = {
	...defaultRules.del,
	react: (node, output, state) => {
		return React.createElement(
			Text,
			{
				key: state.key,
				style: { textDecorationLine: 'line-through' },
			},
			output(node.content, state),
		);
	},
};

export default del;
