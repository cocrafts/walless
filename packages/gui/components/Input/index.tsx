import { FC, ReactNode, useState } from 'react';
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputFocusEventData,
	TextInputProps,
	TextStyle,
	View,
} from 'react-native';
import { StyleProp } from 'react-native';

import { injectedFontStyle } from '../../utils/font';

type Props = {
	style?: StyleProp<TextStyle>;
	focusStyle?: StyleProp<TextStyle>;
	importantStyle?: StyleProp<TextStyle>;
	inputStyle?: StyleProp<TextStyle>;
	prefix?: ReactNode;
	suffix?: ReactNode;
} & TextInputProps;

export const Input: FC<Props> = ({
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

	const textInputStyle = [injectedFontStyle(styles.textInput), inputStyle];

	return (
		<View style={containerStyle}>
			{prefix}
			<TextInput
				style={textInputStyle}
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
		width: 336,
		height: 48,
		borderRadius: 15,
		paddingHorizontal: 16,
		backgroundColor: '#0E141A',
		borderWidth: 1,
		borderColor: 'transparent',
	},
	textInput: {
		flex: 1,
		fontWeight: '400',
	},
	focusStyle: {
		borderColor: '#49596A',
	},
});
