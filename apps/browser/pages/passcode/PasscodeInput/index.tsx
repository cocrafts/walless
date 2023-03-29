import React, { useEffect, useState } from 'react';
import {
	NativeSyntheticEvent,
	TextInput,
	TextInputKeyPressEventData,
} from 'react-native';
import { Button, XStack } from '@walless/wui';

import InputItem from './InputItem';

interface Props {
	isConfirmPhase?: boolean;
	confirmPasscode: string;
	handleActiveButton: (isPasscodeValid: boolean) => void;
	handleInputPasscode: (value: string | number) => void;
	handleWrongInput?: (err: string) => void;
	handleEnterKeyPress?: () => void;
}

const PasscodeInput: React.FC<Props> = ({
	isConfirmPhase = true,
	confirmPasscode,
	handleActiveButton,
	handleInputPasscode,
	handleWrongInput,
	handleEnterKeyPress,
}) => {
	const [focusedIndex, setFocusedIndex] = useState(0);
	const [currentInputRef, setCurrentInputRef] =
		useState<React.RefObject<TextInput> | null>(null);
	const passcodeRegex = /^[0-9]/;

	const handleChangeText = (text: string, index: number) => {
		if (text != '') {
			handleInputPasscode(text);
			setFocusedIndex(index + 1);
		}
	};

	const handleKeyPress = (
		index: number,
		event: NativeSyntheticEvent<TextInputKeyPressEventData>,
		ref: React.RefObject<TextInput>,
	) => {
		let relativeIndex: number;

		if (event.nativeEvent.key === 'Backspace') {
			if (focusedIndex > index) {
				relativeIndex = focusedIndex - 1;
			} else {
				relativeIndex = index - 1;
			}
			ref.current?.clear();
			handleInputPasscode(index);
			setFocusedIndex(relativeIndex);
			return;
		}

		if (event.nativeEvent.key === 'Enter') {
			if (focusedIndex > 5) {
				handleEnterKeyPress?.();
			}

			return;
		}

		if (!passcodeRegex.test(event.nativeEvent.key)) {
			event.preventDefault();
			handleWrongInput?.('Please input number only');
		}
	};

	const handleFocus = (ref: React.RefObject<TextInput>) => {
		setCurrentInputRef(ref);
	};

	const inputItems = [];
	for (let i = 0; i < 6; i++) {
		inputItems.push(
			<InputItem
				key={i}
				index={i}
				focusedIndex={focusedIndex}
				isConfirmPhase={isConfirmPhase}
				confirmPasscode={confirmPasscode}
				handleChangeText={handleChangeText}
				handleKeyPress={handleKeyPress}
				handleFocus={handleFocus}
			/>,
		);
	}

	useEffect(() => {
		handleActiveButton(focusedIndex > 5);
	}, [focusedIndex]);

	useEffect(() => {
		if (confirmPasscode.length === 0) {
			setFocusedIndex(0);
		}
	}, [isConfirmPhase, confirmPasscode]);

	return (
		<XStack justifyContent="space-between">
			{inputItems}
			<Button
				onPress={() => currentInputRef?.current?.focus()}
				position="absolute"
				top={0}
				left={0}
				width="100%"
				backgroundColor="transparent"
			/>
		</XStack>
	);
};

export default PasscodeInput;
