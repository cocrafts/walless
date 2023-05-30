import { createElement } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import {
	type ParserRule,
	type ReactOutputRule,
	defaultRules,
} from 'simple-markdown';

export const hr: ParserRule & ReactOutputRule = {
	...defaultRules.hr,
	react: (node, output, state) => {
		return createElement(View, {
			key: state.key,
			style: {
				marginVertical: 18,
				borderBottomWidth: StyleSheet.hairlineWidth,
				borderColor: 'rgba(255, 255, 255, 0.05)',
			},
		});
	},
};

export default hr;
