import type { StyleProp, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native';

export const injectedFontStyle = (
	style: StyleProp<TextStyle>,
	defaultStyle?: StyleProp<TextStyle>,
): StyleProp<TextStyle> => {
	const { fontFamily } = StyleSheet.flatten([defaultStyle, style]);

	return [defaultStyle, style, { fontFamily }];
};
