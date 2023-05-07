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
	focusStyle?: StyleProp<TextStyle>;
	containerStyle?: StyleProp<TextStyle>;
	inputStyle?: StyleProp<TextStyle>;
	importantInputStyle?: StyleProp<TextStyle>;
	prefix?: ReactNode;
	suffix?: ReactNode;
} & TextInputProps;

export const Input: FC<Props> = ({
	focusStyle,
	containerStyle,
	inputStyle,
	importantInputStyle,
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

	const textInputStyle = [
		injectedFontStyle(styles.textInput),
		inputStyle,
		focused && (focusStyle ? focusStyle : styles.focusStyle),
		importantInputStyle,
	];

	return (
		<View style={[styles.container, containerStyle]}>
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
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	textInput: {
		width: 336,
		height: 48,
		backgroundColor: '#0E141A',
		borderRadius: 15,
		paddingHorizontal: 16,
		fontWeight: '400',
		borderWidth: 1,
		borderColor: 'transparent',
	},
	focusStyle: {
		borderColor: '#49596A',
	},
});
