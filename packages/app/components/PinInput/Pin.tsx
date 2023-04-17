import { forwardRef } from 'react';
import {
	NativeSyntheticEvent,
	TextInput,
	TextInputKeyPressEventData,
} from 'react-native';
import { Input } from '@walless/gui';

interface Props {
	index: number;
	pins: string;
	onChange?: (value: string, index: number) => void;
}

export const Pin = forwardRef<TextInput, Props>(
	({ index, pins, onChange }, ref) => {
		const handleKeyPress = ({
			nativeEvent,
		}: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
			if (['Backspace'].indexOf(nativeEvent.key) >= 0) {
				onChange?.('', index);
			}
		};

		return (
			<Input
				ref={ref}
				pointerEvents="none"
				value={pins[index] || ''}
				maxWidth={42}
				maxLength={1}
				onChangeText={(value: string) => onChange?.(value, index)}
				onKeyPress={handleKeyPress}
			/>
		);
	},
);

Pin.displayName = 'Pin';

export default Pin;
