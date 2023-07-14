import { createElement } from 'react';
import { Text, View } from '@walless/gui';
import type { ParserRule, ReactOutputRule } from 'simple-markdown';
import { blockRegex, defaultRules } from 'simple-markdown';

export const checkList: ParserRule & ReactOutputRule = {
	order: defaultRules.list.order - 1,
	match: blockRegex(/^ *(\[.]) *([^\n]+?) *(?:\n *)+\n/),
	parse: (capture, parse, state) => {
		const listType = capture[0].substring(1, 2);
		const content = capture[0].replace(/^ *\[.] ?/gm, '');

		return { listType, content: parse(content, state) };
	},
	react: (node, output, state) => {
		const { key } = state;
		const backgroundColor = node.listType === 'x' ? 'green' : 'transparent';
		const size = 20;

		return createElement(View, { key, style: { flexDirection: 'row' } }, [
			createElement(View, {
				style: {
					width: size,
					height: size,
					borderRadius: 4,
					backgroundColor,
				},
			}),
			createElement(
				View,
				{
					style: {
						flex: 1,
					},
				},
				[createElement(Text, {}, output(node.content, state))],
			),
		]);
	},
};

export default checkList;
