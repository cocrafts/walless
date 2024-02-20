import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { TextInput, ViewStyle } from 'react-native';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View } from '@walless/gui';

import SingleInput from './SingleInput';

interface Props {
	passcode?: string;
	passcodeLength?: number;
	style?: ViewStyle;
	onChange?: (value: string, isCompleted: boolean) => void;
}

const PasscodeInput: FC<Props> = ({
	passcode = '',
	passcodeLength = 6,
	style,
	onChange,
}) => {
	const inputRef = useRef<TextInput[]>([]);
	const [innerPasscode, setInnerPasscode] = useState(passcode);
	const inputElements = [];

	const onPasscodeChange = (value: string, index: number) => {
		let nextPasscode;
		if (value.length > 0) {
			nextPasscode = innerPasscode + value;
			inputRef.current[index + 1]?.focus();
		} else {
			nextPasscode = innerPasscode?.slice(0, -1);
			inputRef.current[index - 1]?.focus();
		}

		setInnerPasscode(nextPasscode);
		onChange?.(nextPasscode, nextPasscode.length === passcodeLength);
	};

	const handleWrapperPress = () => {
		inputRef.current[innerPasscode.length]?.focus();
	};

	useEffect(() => {
		setInnerPasscode(passcode);
		inputRef.current[passcode.length]?.focus();
	}, [passcode]);

	for (let i = 0; i < passcodeLength; i++) {
		inputElements.push(
			<SingleInput
				ref={(el) => (inputRef.current[i] = el as never)}
				key={i}
				index={i}
				passcode={innerPasscode}
				onPasscodeChange={onPasscodeChange}
			/>,
		);
	}

	return (
		<TouchableWithoutFeedback onPress={handleWrapperPress}>
			<View horizontal cursorPointer style={[styles.container, style]}>
				{inputElements}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default PasscodeInput;

const styles = StyleSheet.create({
	container: {
		gap: 12,
	},
});
