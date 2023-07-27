import type { FC } from 'react';
import type { StyleProp, TextProps, TextStyle } from 'react-native';
import { Text as RNText } from 'react-native';
import { useSnapshot } from 'valtio';

import { dimensionState } from '../states/dimension';
import type { ThemeColors } from '../states/theme';
import { themeState } from '../states/theme';
import { injectedFontStyle } from '../utils/font';

export type ScaledSizes = [
	desktop: number,
	tablet?: number,
	smallTablet?: number,
	mobile?: number,
];

type BaseTextProps = TextProps & {
	style?: StyleProp<TextStyle>;
	responsiveSizes?: ScaledSizes;
};

type ExtendedTextProps = {
	colors: ThemeColors;
	fontFamily: string;
};

type LightTextProps = Omit<BaseTextProps, 'responsiveSizes'> &
	ExtendedTextProps;

type ScaledTextProps = BaseTextProps & ExtendedTextProps;

const LightText: FC<LightTextProps> = ({
	style,
	fontFamily,
	colors,
	...otherProps
}) => {
	const dynamicStyle = injectedFontStyle(style, {
		fontFamily,
		color: colors.text,
	});

	return <RNText style={dynamicStyle} {...otherProps} />;
};

const ScaledText: FC<ScaledTextProps> = ({
	style,
	colors,
	fontFamily,
	responsiveSizes,
	...otherProps
}) => {
	const { responsiveLevel } = useSnapshot(dimensionState);
	const fontSize = extractSizes(responsiveSizes || [14], responsiveLevel);
	const lineHeightFactor = (fontSize as number) > 20 ? 1.2 : 1.35;

	const dynamicStyle = injectedFontStyle(style, {
		fontFamily,
		fontSize,
		lineHeight: (fontSize as number) * lineHeightFactor,
		color: colors.text,
	});

	return <RNText style={dynamicStyle} {...otherProps} />;
};

export const Text: FC<BaseTextProps> = ({ responsiveSizes, ...otherProps }) => {
	const { colors, defaultFontFamily } = useSnapshot(themeState);

	if (responsiveSizes) {
		return (
			<ScaledText
				colors={colors}
				fontFamily={defaultFontFamily}
				responsiveSizes={responsiveSizes}
				{...otherProps}
			/>
		);
	}

	return (
		<LightText colors={colors} fontFamily={defaultFontFamily} {...otherProps} />
	);
};

export default Text;

const extractSizes = (sizes: ScaledSizes, level: number) => {
	for (let i = level; i >= 0; i -= 1) {
		if (sizes[i]) return sizes[i];
	}
};
