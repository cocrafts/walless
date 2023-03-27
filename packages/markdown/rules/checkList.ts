import { createElement } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import {
	blockRegex,
	defaultRules,
	ParserRule,
	ReactOutputRule,
} from 'simple-markdown';

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
		const containerStyle: ViewStyle = {
			flexDirection: 'row',
		};
		const iconStyle: ViewStyle = {
			width: size,
			height: size,
			borderRadius: 4,
			backgroundColor,
		};
		const textStyle: TextStyle = {
			flex: 1,
		};

		return createElement(View, { key, style: containerStyle }, [
			createElement(View, { style: iconStyle }),
			createElement(View, { style: textStyle }, [
				createElement(Text, {}, output(node.content, state)),
			]),
		]);
	},
};

export default checkList;
