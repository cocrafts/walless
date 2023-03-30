import React, { RefObject, useEffect } from 'react';
import {
	NativeSyntheticEvent,
	TextInput,
	TextInputKeyPressEventData,
} from 'react-native';
import { Input } from '@walless/wui';

interface Props {
	index: number;
	focusedIndex: number;
	isConfirmPhase: boolean;
	confirmPasscode: string;
	handleChangeText: (
		text: string,
		index: number,
		ref: RefObject<TextInput>,
	) => void;
	handleKeyPress: (
		index: number,
		event: NativeSyntheticEvent<TextInputKeyPressEventData>,
		ref: RefObject<TextInput>,
	) => void;
	handleFocus: (ref: RefObject<TextInput>) => void;
}

const InputItem: React.FC<Props> = ({
	index,
	focusedIndex,
	isConfirmPhase,
	confirmPasscode,
	handleChangeText,
	handleKeyPress,
	handleFocus,
}) => {
	const ref = React.useRef<TextInput>(null);

	useEffect(() => {
		if (focusedIndex === index) {
			ref.current?.focus();
		}
	}, [focusedIndex]);

	useEffect(() => {
		if (confirmPasscode.length === 0) {
			ref.current?.clear();
		}
	}, [isConfirmPhase, confirmPasscode]);

	return (
		<Input
			ref={ref}
			secureTextEntry
			maxLength={1}
			pointerEvents="box-none"
			onChangeText={(text) => handleChangeText(text, index, ref)}
			onKeyPress={(event) => handleKeyPress(index, event, ref)}
			onFocus={() => handleFocus(ref)}
			width={40}
		/>
	);
};

export default InputItem;
