import type { StyleProp, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native';

const WeightMap = {
	normal: 'Regular',
	bold: 'Bold',
	'100': 'Thin',
	'200': 'ExtraLight',
	'300': 'Light',
	'400': 'Regular',
	'500': 'Medium',
	'600': 'SemiBold',
	'700': 'Bold',
	'800': 'ExtraBold',
	'900': 'Black',
};

export const injectedFontStyle = (
	style: StyleProp<TextStyle> = {},
	defaultStyle: StyleProp<TextStyle> = {},
): StyleProp<TextStyle> => {
	const {
		fontFamily = 'Rubik',
		fontWeight = '400',
		fontStyle,
	} = StyleSheet.flatten([style, defaultStyle]);
	const italic = fontStyle === 'italic' ? 'Italic' : '';
	const finalFamily = `${fontFamily}-${WeightMap[fontWeight]}${italic}`;
	const injectedStyle: TextStyle = {
		fontFamily: finalFamily,
		fontWeight: 'normal',
		fontStyle: 'normal',
	};

	return [defaultStyle, style, injectedStyle];
};
