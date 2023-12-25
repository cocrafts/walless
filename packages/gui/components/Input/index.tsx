import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import type {
	NativeSyntheticEvent,
	TextInputFocusEventData,
	TextInputProps,
	TextStyle,
} from 'react-native';
import type { StyleProp } from 'react-native';
import { StyleSheet, TextInput, View } from 'react-native';
import { useSnapshot } from 'valtio';

import { themeState } from '../../states/theme';
import { injectedFontStyle } from '../../utils/font';

export type InputProps = {
	style?: StyleProp<TextStyle>;
	focusStyle?: StyleProp<TextStyle>;
	importantStyle?: StyleProp<TextStyle>;
	inputStyle?: StyleProp<TextStyle>;
	prefix?: ReactNode;
	suffix?: ReactNode;
} & TextInputProps;

export const Input: FC<InputProps> = ({
	style,
	focusStyle,
	importantStyle,
	inputStyle,
	prefix,
	suffix,
	placeholderTextColor,
	onFocus,
	onBlur,
	...otherProps
}) => {
	const { colors, defaultFontFamily } = useSnapshot(themeState);
	const [focused, setFocused] = useState(otherProps.autoFocus);

	const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setFocused(true);
		if (onFocus) onFocus(e);
	};

	const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setFocused(false);
		if (onBlur) onBlur(e);
	};

	const containerStyle = [
		styles.container,
		style,
		focused && (focusStyle ? focusStyle : styles.focusStyle),
		importantStyle,
	];

	const dynamicStyle = injectedFontStyle(inputStyle, {
		flex: 1,
		paddingVertical: 15,
		paddingHorizontal: 16,
		fontFamily: defaultFontFamily,
		color: colors.text,
	});

	return (
		<View style={containerStyle}>
			{prefix}
			<TextInput
				style={dynamicStyle}
				placeholderTextColor={
					placeholderTextColor ? placeholderTextColor : '#566674'
				}
				onFocus={handleFocus}
				onBlur={handleBlur}
				{...otherProps}
			/>
			{suffix}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#0E141A',
		borderRadius: 15,
		borderWidth: 1,
		borderColor: 'transparent',
	},
	focusStyle: {
		borderColor: 'rgba(255, 255, 255, 0.1)',
	},
});
