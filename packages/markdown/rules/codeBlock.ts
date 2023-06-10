import { createElement } from 'react';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/styles/hljs';
import {
	type ParserRule,
	type ReactOutputRule,
	defaultRules,
} from 'simple-markdown';

const codeBlock: ParserRule & ReactOutputRule = {
	...defaultRules.codeBlock,
	react: function (node, output, state) {
		return createElement(
			SyntaxHighlighter,
			{
				key: state.key,
				language: node.lang,
				style: {
					...vs2015,
					hljs: {
						...vs2015['hljs'],
						backgroundColor: '#161b22',
						borderRadius: '10px',
						overflow: 'hidden',
						padding: '16px',
						marginTop: '10px',
					},
				},
				fontSize: 14,
			},
			node.content,
		);
	},
};

export default codeBlock;
