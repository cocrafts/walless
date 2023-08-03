import type { FC } from 'react';
import { useState } from 'react';
import type {
	LayoutChangeEvent,
	LayoutRectangle,
	ViewProps,
} from 'react-native';
import { View } from '@walless/gui';
import { merge } from 'lodash';

import { defaultConfigs } from './utils/default';
import { parse, reactOutput } from './utils/internal';
import type { MarkdownConfig, MarkdownOptions } from './utils/types';

type Props = ViewProps & {
	content: string;
	options?: Partial<MarkdownOptions>;
};

const Markdown: FC<Props> = ({ content, options, ...viewProps }) => {
	const syntaxTree = parse(content);
	const [layout, setLayout] = useState<LayoutRectangle>(initialLayout);

	const config: MarkdownConfig = merge(defaultConfigs, options, { layout });

	const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setLayout(nativeEvent.layout);
	};

	return (
		<View onLayout={onLayout} {...viewProps}>
			{reactOutput(syntaxTree, { config })}
		</View>
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
