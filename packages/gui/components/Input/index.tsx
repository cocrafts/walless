import { FC, useState } from 'react';
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputFocusEventData,
	TextInputProps,
	TextStyle,
} from 'react-native';
import { StyleProp } from 'react-native';

import { injectedFontStyle } from '../../utils/font';

type Props = {
	focusStyle?: StyleProp<TextStyle>;
} & TextInputProps;

export const Input: FC<Props> = ({
	focusStyle,
	placeholderTextColor,
	onFocus,
	onBlur,
	...otherProps
}) => {
	const [focused, setFocused] = useState(otherProps.autoFocus);

	const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setFocused(true);
		if (onFocus) onFocus(e);
	};

	const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setFocused(false);
		if (onBlur) onBlur(e);
	};

	return (
		<TextInput
			style={[
				injectedFontStyle(styles.textInput),
				focused && (focusStyle ? focusStyle : styles.focusStyle),
			]}
			placeholderTextColor={
				placeholderTextColor ? placeholderTextColor : '#566674'
			}
			onFocus={handleFocus}
			onBlur={handleBlur}
			{...otherProps}
		/>
	);
};

const styles = StyleSheet.create({
	textInput: {
		width: 336,
		height: 48,
		backgroundColor: '#0E141A',
		borderRadius: 15,
		paddingHorizontal: 16,
		fontWeight: '400',
	},
	focusStyle: {
		borderWidth: 1,
		borderColor: '#49596A',
	},
});
