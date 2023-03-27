import React from 'react';
import { Text, TextStyle } from 'react-native';
import { transparentize } from 'color2k';
import { defaultRules, ParserRule, ReactOutputRule } from 'simple-markdown';

import { MarkdownConfig } from '../utils/types';

export const inlineCode: ParserRule & ReactOutputRule = {
	...defaultRules.inlineCode,
	react: (node, output, state) => {
		const { color, config } = state;
		const { dark, fontFamily, fontSize, colors }: MarkdownConfig = config;
		const transparentAmount = dark ? 0.5 : 0.8;

		const style: TextStyle = {
			fontFamily,
			fontWeight: '400',
			fontSize,
			backgroundColor: transparentize(colors.alt as never, transparentAmount),
			borderRadius: 6,
			paddingHorizontal: 5,
			marginHorizontal: 2,
			color: color || colors.secondary,
		};

		return React.createElement(Text, { key: state.key, style }, node.content);
	},
};

export default inlineCode;
