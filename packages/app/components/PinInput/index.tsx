import { type FC, useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { type StackProps, Stack } from '@walless/gui';

import Pin from './Pin';

type Props = StackProps & {
	value?: string;
	autoFocus?: boolean;
	pinCount?: number;
	onPinChange?: (pin: string, isCompleted?: boolean) => void;
};

export const PinInput: FC<Props> = ({
	value = '',
	autoFocus = true,
	pinCount = 6,
	onPinChange,
	...stackProps
}) => {
	const inputRef = useRef<TextInput[]>([]);
	const [pins, setPins] = useState(value);
	const pinElements = [];

	const handleWrapperPress = () => {
		inputRef.current[pins.length]?.focus();
	};

	const handlePinChange = (char: string, index: number) => {
		let nextPins;

		if (char.length > 0) {
			nextPins = pins + char;
			inputRef.current[index + 1]?.focus();
		} else {
			nextPins = pins.slice(0, -1);
			inputRef.current[index - 1]?.focus();
		}

		setPins(nextPins);
		onPinChange?.(nextPins, nextPins.length === pinCount);
	};

	useEffect(() => {
		setPins(value);
		inputRef.current[value.length]?.focus();
	}, [value]);

	useEffect(() => {
		if (autoFocus) {
			inputRef.current[0]?.focus();
		}
	}, []);

	for (let i = 0; i < pinCount; i++) {
		pinElements.push(
			<Pin
				ref={(el) => (inputRef.current[i] = el as never)}
				key={i}
				index={i}
				pins={pins}
				onChange={handlePinChange}
			/>,
		);
	}

	return (
		<Stack
			horizontal
			gap={12}
			cursor="pointer"
			onPress={handleWrapperPress}
			{...stackProps}
		>
			{pinElements}
		</Stack>
	);
};

export default PinInput;
