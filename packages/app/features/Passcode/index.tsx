import { type FC, useEffect, useRef, useState } from 'react';
import { type ViewStyle, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@walless/gui';

import PasscodeInput from './PasscodeInput';

interface Props {
	containerStyle?: ViewStyle;
	passcode?: string;
	isCreate?: boolean;
	error?: string;
	onPasscodeChange?: (
		value: string,
		isCompleted?: boolean,
		isConfirmation?: boolean,
	) => void;
}

export const PasscodeFeature: FC<Props> = ({
	containerStyle,
	passcode = '',
	isCreate = false,
	error = '',
	onPasscodeChange,
}) => {
	const createPasscodeRef = useRef({ value: '', isConfirmation: false });
	const [innerPasscode, setInnerPasscode] = useState(passcode);
	const [innerError, setInnerError] = useState(error);

	const handlePasscodeChange = (value: string, isCompleted?: boolean) => {
		let nextValue = value;
		let nextIsCompleted = isCompleted;

		const isFirstCompleted =
			isCompleted && !createPasscodeRef.current.isConfirmation;
		const isSecondCompleted =
			isCompleted && createPasscodeRef.current.isConfirmation;

		if (isCreate) {
			if (isFirstCompleted) {
				nextValue = '';
				nextIsCompleted = false;
				createPasscodeRef.current = { value, isConfirmation: true };
			} else if (isSecondCompleted) {
				if (nextValue !== createPasscodeRef.current.value) {
					nextValue = '';
					nextIsCompleted = false;
					setInnerError('Passcode does not match');
				}
			}
		}

		setInnerPasscode(nextValue);
		onPasscodeChange?.(
			nextValue,
			nextIsCompleted,
			createPasscodeRef.current.isConfirmation,
		);
	};

	const handleResetPasscode = () => {
		createPasscodeRef.current = { value: '', isConfirmation: false };
		setInnerError('');
		onPasscodeChange?.('', false, createPasscodeRef.current.isConfirmation);
	};

	useEffect(() => {
		setInnerPasscode(passcode);
		if (passcode.length > 0) {
			setInnerError('');
		}
	}, [passcode]);
	useEffect(() => setInnerError(error), [error]);

	return (
		<View style={[styles.container, containerStyle]}>
			<PasscodeInput passcode={innerPasscode} onChange={handlePasscodeChange} />
			<Text style={styles.errorMessage}>{innerError || ' '}</Text>
			{isCreate && createPasscodeRef.current.isConfirmation ? (
				<TouchableOpacity
					style={{ marginTop: 20 }}
					onPress={handleResetPasscode}
				>
					<Text style={styles.newPasscodeText}>Try new passcode?</Text>
				</TouchableOpacity>
			) : (
				<View style={{ marginTop: 20 }}>
					<Text> </Text>
				</View>
			)}
		</View>
	);
};

export default PasscodeFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	errorMessage: {
		paddingTop: 10,
		color: '#AE3939',
		textAlign: 'center',
	},
	newPasscodeText: {
		textDecorationLine: 'underline',
		color: '#566674',
	},
});
