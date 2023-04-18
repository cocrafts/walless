import { type FC, useState } from 'react';
import { type LayoutChangeEvent, type LayoutRectangle } from 'react-native';
import { type StackProps } from '@tamagui/core';
import { Stack } from '@walless/ui';
import { merge } from 'lodash';

import { defaultConfigs } from './utils/default';
import { parse, reactOutput } from './utils/internal';
import { type MarkdownConfig, type MarkdownOptions } from './utils/types';

type Props = StackProps & {
	content: string;
	options?: Partial<MarkdownOptions>;
};

const Markdown: FC<Props> = ({ content, options, ...stackProps }) => {
	const syntaxTree = parse(content);
	const [layout, setLayout] = useState<LayoutRectangle>(initialLayout);

	const config: MarkdownConfig = merge(defaultConfigs, options, { layout });

	const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setLayout(nativeEvent.layout);
	};

	return (
		<Stack onLayout={onLayout} {...stackProps}>
			{reactOutput(syntaxTree, { config })}
		</Stack>
	);
};

export default Markdown;

const initialLayout = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
};

export * from './utils/types';
