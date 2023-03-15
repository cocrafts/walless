import React, { useEffect, useState } from 'react';
import {
	NativeSyntheticEvent,
	TextInput as InputType,
	TextInputKeyPressEventData,
	TouchableWithoutFeedback,
} from 'react-native';
import { View } from '@walless/ui';

import SingleInput from './SingleInput';

interface Props {
	isConfirmPhase?: boolean;
	confirmPasscode: string;
	handleActiveButton: (isPasscodeValid: boolean) => void;
	handlePasscode: (value: string | number) => void;
	handleWrongInput?: (err: string) => void;
}

export const PasscodeInput: React.FC<Props> = ({
	isConfirmPhase = true,
	confirmPasscode,
	handleActiveButton,
	handlePasscode,
	handleWrongInput,
}) => {
	const [focusedIndex, setFocusedIndex] = useState(0);
	const [currentInputRef, setCurrentInputRef] =
		useState<React.RefObject<InputType> | null>(null);
	const passcodeRegex = /^[0-9]/;

	const handleChangeText = (text: string, index: number) => {
		if (text !== '') {
			handlePasscode(text);
			setFocusedIndex(index + 1);
		}
	};

	const handleKeyPress = (
		index: number,
		event: NativeSyntheticEvent<TextInputKeyPressEventData>,
		ref: React.RefObject<InputType>,
	) => {
		let relativeIndex: number;

		if (event.nativeEvent.key === 'Backspace') {
			if (focusedIndex > index) {
				relativeIndex = focusedIndex - 1;
			} else {
				relativeIndex = index - 1;
			}
			ref.current?.clear();
			handlePasscode(index);
			setFocusedIndex(relativeIndex);
			return;
		}

		if (event.nativeEvent.key === 'Enter') {
			return;
		}

		if (!passcodeRegex.test(event.nativeEvent.key)) {
			event.preventDefault();
			handleWrongInput?.('Please input number only');
		}
	};

	const handleFocus = (ref: React.RefObject<InputType>) => {
		setCurrentInputRef(ref);
	};

	const inputItems = [];
	for (let i = 0; i < 6; i++) {
		inputItems.push(
			<SingleInput
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
		<View className="flex-row justify-between min-w-[300px]">
			{inputItems}
			<TouchableWithoutFeedback
				onPress={() => currentInputRef?.current?.focus()}
			>
				<View className="absolute top-0 left-0 w-full h-full" />
			</TouchableWithoutFeedback>
		</View>
	);
};

export default PasscodeInput;
