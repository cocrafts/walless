import { createElement } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import {
	defaultRules,
	ParserRule,
	ReactOutputRule,
	SingleASTNode,
} from 'simple-markdown';

import { MarkdownConfig } from '../utils/types';

export const list: ParserRule & ReactOutputRule = {
	...defaultRules.list,
	react: (node, output, state) => {
		const { color, config } = state;
		const { fontFamily, fontSize, colors }: MarkdownConfig = config;
		const items = node.items || [];

		const textStyle: TextStyle = {
			fontFamily,
			fontSize,
			fontWeight: '500',
			color: color || colors.text,
		};
		const bulletStyle: TextStyle = {
			...textStyle,
			marginRight: 6,
			color: colors.alt,
		};
		const orderedStyle: TextStyle = { ...textStyle, marginRight: 6 };
		const checkboxStyle: ViewStyle = {
			width: checkboxSize,
			height: checkboxSize,
			borderRadius: 3,
			borderWidth: 2,
			borderColor: colors.alt,
			marginLeft: -3,
			marginTop: 5,
			marginRight: 6,
		};
		const completedCheckbox: ViewStyle = {
			backgroundColor: colors.primary,
			borderColor: colors.primary,
		};

		const bullets = items.map((item: SingleASTNode[], i: number) => {
			const [first, second, ...tails] = item;
			const isTodoStart = first?.content?.match?.(/^ *\[(.) *.*/);
			const isTodoClose = second?.content?.substring?.(0, 1) === ']';
			const isTodo = isTodoStart && isTodoClose;
			const selected = first?.content?.substring?.(1, 2) !== ' ';
			const content = isTodo
				? output(
						[
							{
								...second,
								content: second.content?.substring(1)?.trim() || '',
							},
							...tails,
						],
						state,
				  )
				: output(item, state);

			const generateListIcon = () => {
				if (isTodo) {
					return createElement(View, {
						style: [checkboxStyle, selected && completedCheckbox],
					});
				} else if (node.ordered) {
					return createElement(Text, { style: orderedStyle }, `${i + 1}.`);
				} else {
					return createElement(Text, { style: bulletStyle }, '●');
				}
			};

			return createElement(
				Text,
				{ key: `${state.key}#${i}` },
				generateListIcon(),
				content,
			);
		});

		return createElement(
			View,
			{ key: state.key, style: { marginLeft: 8 } },
			bullets,
		);
	},
};

export default list;

const checkboxSize = 12;
