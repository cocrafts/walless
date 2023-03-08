import React, { useEffect, useRef } from 'react';
import {
	NativeSyntheticEvent,
	TextInput as InputType,
	TextInputKeyPressEventData,
} from 'react-native';
import { TextInput, View } from '@walless/ui';

interface Props {
	index: number;
	focusedIndex: number;
	isConfirmPhase: boolean;
	confirmPasscode: string;
	handleChangeText: (
		text: string,
		index: number,
		ref: React.RefObject<InputType>,
	) => void;
	handleKeyPress: (
		index: number,
		event: NativeSyntheticEvent<TextInputKeyPressEventData>,
		ref: React.RefObject<InputType>,
	) => void;
	handleFocus: (ref: React.RefObject<InputType>) => void;
}

export const SingleInput: React.FC<Props> = ({
	index,
	focusedIndex,
	isConfirmPhase,
	confirmPasscode,
	handleChangeText,
	handleKeyPress,
	handleFocus,
}) => {
	const ref = useRef<InputType>(null);

	useEffect(() => {
		if (focusedIndex === index) {
			ref.current?.focus();
		}
	}, [focusedIndex]);

	useEffect(() => {
		if (isConfirmPhase && confirmPasscode.length === 0) {
			ref.current?.clear();
		}
	}, [isConfirmPhase, confirmPasscode]);

	return (
		<View className=" py-2 bg-[color:#1B415A] rounded-xl">
			<TextInput
				ref={ref}
				className="w-10 font-poppins text-white text-2xl text-center"
				secureTextEntry
				maxLength={1}
				pointerEvents="box-none"
				onChangeText={(text) => handleChangeText(text, index, ref)}
				onKeyPress={(event) => handleKeyPress(index, event, ref)}
				onFocus={() => handleFocus(ref)}
			/>
		</View>
	);
};

export default SingleInput;
