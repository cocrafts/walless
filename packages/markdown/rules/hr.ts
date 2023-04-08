import { createElement } from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from '@tamagui/core';
import {
	type ParserRule,
	type ReactOutputRule,
	defaultRules,
} from 'simple-markdown';

export const hr: ParserRule & ReactOutputRule = {
	...defaultRules.hr,
	react: (node, output, state) => {
		return createElement(Stack, {
			key: state.key,
			marginVertical: 18,
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderColor: 'rgba(255, 255, 255, 0.05)',
		});
	},
};

export default hr;
