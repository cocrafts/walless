import { forwardRef, useState } from 'react';
import type {
	NativeSyntheticEvent,
	TextInputKeyPressEventData,
} from 'react-native';
import { StyleSheet, TextInput } from 'react-native';
import { View } from '@walless/gui';

interface Props {
	index: number;
	width?: number;
	height?: number;
	passcode?: string;
	onPasscodeChange?: (value: string, index: number) => void;
}

const SingleInput = forwardRef<TextInput, Props>(
	(
		{ index, width = 42, height = 48, passcode = '', onPasscodeChange },
		ref,
	) => {
		const [isFocused, setIsFocused] = useState(false);
		const value = passcode[index] || '';
		const isFilled = value.length > 0;
		const borderColor = isFocused
			? 'rgba(255, 255, 255, 0.2)'
			: isFilled
			  ? 'rgba(255, 255, 255, 0.1)'
			  : 'transparent';
		const conditionalStyle = {
			width,
			height,
			borderColor,
		};

		const onChangeText = (value: string) => {
			onPasscodeChange?.(value, index);
		};

		const onKeyPress = ({
			nativeEvent,
		}: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
			if (['Backspace'].includes(nativeEvent.key)) {
				onPasscodeChange?.('', index);
			}
		};

		return (
			<View>
				<TextInput
					ref={ref}
					style={[conditionalStyle, styles.inputContainer]}
					maxLength={1}
					secureTextEntry
					pointerEvents="none"
					value={value}
					onChangeText={onChangeText}
					onKeyPress={onKeyPress}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					keyboardType="numeric"
				/>
				{isFilled && (
					<View fullscreen style={styles.center}>
						<View style={styles.dot} />
					</View>
				)}
			</View>
		);
	},
);

SingleInput.displayName = 'SingleInput';

export default SingleInput;

const dotSize = 10;

const styles = StyleSheet.create({
	inputContainer: {
		borderRadius: 12,
		borderWidth: 2,
		backgroundColor: '#0e141a',
		textAlign: 'center',
		color: '#0e141a',
	},
	center: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	dot: {
		width: dotSize,
		height: dotSize,
		borderRadius: dotSize / 2,
		backgroundColor: '#ffffff',
	},
});
