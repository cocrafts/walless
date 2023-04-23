import { type StyleProp, type TextStyle, StyleSheet } from 'react-native';

export const injectedFontStyle = (
	style: StyleProp<TextStyle> = {},
	defaultStyle: StyleProp<TextStyle> = {},
): StyleProp<TextStyle> => {
	const { fontFamily = 'Rubik' } = StyleSheet.flatten([style, defaultStyle]);

	return [defaultStyle, style, { fontFamily }];
};
