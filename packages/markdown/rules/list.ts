import { createElement } from 'react';
import { type TextProps, Stack, Text } from '@tamagui/core';
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

		const textProps: TextProps = {
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
					return createElement(Stack, {
						width: checkboxSize,
						height: checkboxSize,
						borderRadius: 3,
						borderWidth: 2,
						borderColor: selected ? colors.primary : colors.alt,
						backgroundColor: selected ? colors.primary : 'transparent',
						marginLeft: -3,
						marginTop: 5,
						marginRight: 6,
					});
				} else if (node.ordered) {
					return createElement(
						Text,
						{ ...textProps, marginRight: 6 },
						`${i + 1}.`,
					);
				} else {
					return createElement(
						Text,
						{ ...textProps, marginRight: 6, color: colors.alt },
						'●',
					);
				}
			};

			return createElement(
				Text,
				{ key: `${state.key}#${i}`, lineHeight: fontSize * 1.5 },
				generateListIcon(),
				content,
			);
		});

		return createElement(Stack, { key: state.key, marginLeft: 8 }, bullets);
	},
};

export default list;

const checkboxSize = 12;
