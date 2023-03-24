import React from 'react';
import {
	LayoutChangeEvent,
	LayoutRectangle,
	View,
	ViewStyle,
} from 'react-native';

import { defaultConfigs } from './utils/default';
import { parse, reactOutput } from './utils/internal';
import { MarkdownConfig } from './utils/types';

interface Props {
	style?: ViewStyle;
	content: string;
	configs?: Partial<MarkdownConfig>;
}

const Markdown: React.FC<Props> = ({ style, content, configs }) => {
	const syntaxTree = parse(content);
	const [layout, setLayout] = React.useState<LayoutRectangle>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});

	const config: MarkdownConfig = {
		layout,
		...defaultConfigs,
		...configs,
	};

	const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setLayout(nativeEvent.layout);
	};

	return (
		<View style={style} onLayout={onLayout}>
			{reactOutput(syntaxTree, { config })}
		</View>
	);
};

export default Markdown;
