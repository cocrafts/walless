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
		backgroundColor: '#0E141A',
		borderRadius: 15,
		borderWidth: 1,
		borderColor: 'transparent',
	},
	textInput: {
		paddingVertical: 15,
		paddingHorizontal: 16,
	},
	focusStyle: {
		borderColor: 'rgba(255, 255, 255, 0.1)',
	},
});
