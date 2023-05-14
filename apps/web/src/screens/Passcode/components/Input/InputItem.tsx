import { type FC, type RefObject, useEffect, useRef, useState } from 'react';
import {
	type NativeSyntheticEvent,
	type TextInput,
	type TextInputKeyPressEventData,
} from 'react-native';
import { Input } from '@walless/ui';

interface Props {
	index: number;
	focusedIndex?: number;
	passcode?: string;
	handleChangeText?: (text: string, index: number) => void;
	handleKeyPress?: (
		event: NativeSyntheticEvent<TextInputKeyPressEventData>,
		index: number,
	) => void;
	handleFocus?: (ref: RefObject<TextInput>) => void;
}

export const InputItem: FC<Props> = ({
	index,
	focusedIndex,
	passcode,
	handleChangeText,
	handleKeyPress,
	handleFocus,
}) => {
	const ref = useRef<TextInput>(null);
	const [isEmpty, setIsEmpty] = useState(true);

	const onChangeText = (text: string) => {
		handleChangeText?.(text, index);
		setIsEmpty(text === '');
	};

	const onFocus = () => {
		handleFocus?.(ref);
	};

	useEffect(() => {
		if (focusedIndex === index) {
			ref.current?.focus();
		}
	}, [focusedIndex]);

	useEffect(() => {
		if (passcode?.length === 0) {
			ref.current?.clear();
		}
	}, [passcode]);

	return (
		<Input
			fontSize={28}
			lineHeight={10}
			paddingHorizontal={0}
			paddingVertical={10}
			borderRadius={15}
			maxWidth={45}
			borderColor={isEmpty ? 'transparent' : '#49596A'}
			backgroundColor="#0E141A"
			focusStyle={{
				borderColor: '#49596A',
			}}
			textAlign="center"
			ref={ref}
			secureTextEntry
			maxLength={1}
			pointerEvents="box-none"
			onChangeText={onChangeText}
			onKeyPress={(event) => handleKeyPress?.(event, index)}
			onFocus={onFocus}
		/>
	);
};

export default InputItem;
