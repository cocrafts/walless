import { createElement } from 'react';
import { type TextStyle } from 'react-native';
import { Text, View } from '@walless/gui';
import {
	type ParserRule,
	type ReactOutputRule,
	type SingleASTNode,
	defaultRules,
} from 'simple-markdown';

import { type MarkdownConfig } from '../utils/types';

export const list: ParserRule & ReactOutputRule = {
	...defaultRules.list,
	react: (node, output, state) => {
		const { color, config } = state;
		const { fontFamily, fontSize, colors }: MarkdownConfig = config;
		const items = node.items || [];

		const textStyles: TextStyle = {
			fontFamily,
			fontSize,
			fontWeight: '500',
			color: color || colors.text,
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
						style: {
							width: checkboxSize,
							height: checkboxSize,
							borderRadius: 3,
							borderWidth: 2,
							borderColor: selected ? colors.primary : colors.alt,
							backgroundColor: selected ? colors.primary : 'transparent',
							marginLeft: -3,
							marginTop: 5,
							marginRight: 6,
						},
					});
				} else if (node.ordered) {
					return createElement(
						Text,
						{
							style: {
								...textStyles,
								marginRight: 6,
							},
						},
						`${i + 1}.`,
					);
				} else {
					return createElement(
						Text,
						{ style: { ...textStyles, marginRight: 6, color: colors.alt } },
						'●',
					);
				}
			};

			return createElement(
				Text,
				{
					key: `${state.key}#${i}`,
					style: {
						lineHeight: fontSize * 1.5,
					},
				},
				generateListIcon(),
				content,
			);
		});

		return createElement(
			View,
			{
				key: state.key,
				style: {
					marginLeft: 8,
				},
			},
			bullets,
		);
	},
};

export default list;

const checkboxSize = 12;
