import { FC, useEffect, useRef, useState } from 'react';
import {
	type TextInput,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';
import { View } from '@walless/gui';

import SingleInput from './SingleInput';

interface Props {
	passcode?: string;
	passcodeLength?: number;
	onChange?: (value: string, isCompleted: boolean) => void;
}

const PasscodeInput: FC<Props> = ({
	passcode = '',
	passcodeLength = 6,
	onChange,
}) => {
	const inputRef = useRef<TextInput[]>([]);
	const [innerPasscode, setInnderPasscode] = useState(passcode);
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

		setInnderPasscode(nextPasscode);
		onChange?.(nextPasscode, nextPasscode.length === passcodeLength);
	};

	const handleWrapperPress = () => {
		inputRef.current[innerPasscode.length]?.focus();
	};

	useEffect(() => {
		setInnderPasscode(passcode);
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
			<View horizontal style={style.container}>
				{inputElements}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default PasscodeInput;

const style = StyleSheet.create({
	container: {
		gap: 12,
		...Platform.select({
			web: {
				cursor: 'pointer',
			},
		}),
	},
});
