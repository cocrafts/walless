import { forwardRef } from 'react';
import {
	NativeSyntheticEvent,
	TextInput,
	TextInputKeyPressEventData,
} from 'react-native';
import { Input, Stack } from '@walless/gui';

interface Props {
	index: number;
	width?: number;
	height?: number;
	pins: string;
	onChange?: (value: string, index: number) => void;
}

const dotSize = 10;

export const Pin = forwardRef<TextInput, Props>(
	({ index, width = 42, height = 48, pins, onChange }, ref) => {
		const value = pins[index] || '';
		const filled = value?.length > 0;
		const handleKeyPress = ({
			nativeEvent,
		}: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
			if (['Backspace'].indexOf(nativeEvent.key) >= 0) {
				onChange?.('', index);
			}
		};

		return (
			<Stack>
				<Input
					ref={ref}
					secureTextEntry
					pointerEvents="none"
					textAlign="center"
					value={value}
					fontSize={14}
					width={width}
					height={height}
					maxLength={1}
					borderRadius={12}
					borderWidth={2}
					borderColor={filled ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
					carretColor="white"
					backgroundColor="#0e141a"
					focusStyle={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
					onChangeText={(value: string) => onChange?.(value, index)}
					onKeyPress={handleKeyPress}
				/>
				{filled && (
					<Stack
						pointerEvents="none"
						position="absolute"
						top={height / 2 - dotSize / 2}
						left={width / 2 - dotSize / 2}
						width={dotSize}
						height={dotSize}
						borderRadius={dotSize / 2}
						backgroundColor="white"
					/>
				)}
			</Stack>
		);
	},
);

Pin.displayName = 'Pin';

export default Pin;
