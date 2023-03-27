import { createElement, FC } from 'react';
import { Image, ImageURISource, Text, TextStyle, View } from 'react-native';
import { defaultRules, ParserRule, ReactOutputRule } from 'simple-markdown';

import { useImageAspectRatio } from '../utils/hook';
import { MarkdownState } from '../utils/types';

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
		const captionStyle: TextStyle = {
			fontFamily,
			textAlign: 'center',
			fontSize: 12,
			color: colors.alt,
			marginTop: 3,
		};

		return createElement(View, { key }, [
			createElement(AspectImage, {
				key: 'image',
				width: layout.width,
				source: imageSrc,
			}),
			caption &&
				createElement(Text, { key: 'caption', style: captionStyle }, caption),
		]);
	},
};

export default image;
