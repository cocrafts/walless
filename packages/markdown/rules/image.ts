import { type FC, createElement } from 'react';
import { type ImageURISource, Image } from 'react-native';
import { Text, View } from '@walless/gui';
import {
	type ParserRule,
	type ReactOutputRule,
	defaultRules,
} from 'simple-markdown';

import { useImageAspectRatio } from '../utils/hook';
import { type MarkdownState } from '../utils/types';

interface AspectImageProps {
	width: number;
	source: ImageURISource;
}

const AspectImage: FC<AspectImageProps> = ({ width, source }) => {
	const aspectRatio = useImageAspectRatio(source.uri as never);
	const style = { width, aspectRatio, borderRadius: 5 };

	return createElement(Image, { source, style });
};

export const image: ParserRule & ReactOutputRule = {
	...defaultRules.image,
	react: (node, output, state) => {
		const { key, config } = state as MarkdownState;
		const { layout, fontFamily, colors } = config;
		const imageSrc = { uri: node.target };
		const caption = node.title;

		return createElement(View, { key }, [
			createElement(AspectImage, {
				key: 'image',
				width: layout.width,
				source: imageSrc,
			}),
			caption &&
				createElement(
					Text,
					{
						key: 'caption',
						style: {
							fontFamily,
							textAlign: 'center',
							fontSize: 12,
							color: colors.alt,
							marginTop: 3,
						},
					},
					caption,
				),
		]);
	},
};

export default image;
