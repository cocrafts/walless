import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@walless/gui';

import PasscodeInput from './PasscodeInput';

interface Props {
	style?: ViewStyle;
	passcode?: string;
	isCreate?: boolean;
	error?: string;
	loading?: boolean;
	onPasscodeChange?: (
		value: string,
		isCompleted?: boolean,
		isConfirmation?: boolean,
	) => void;
}

export const Passcode: FC<Props> = ({
	style,
	passcode = '',
	isCreate = false,
	error = '',
	loading = false,
	onPasscodeChange,
}) => {
	const createPasscodeRef = useRef({ value: '', isConfirmation: false });
	const [innerPasscode, setInnerPasscode] = useState(passcode);
	const [innerError, setInnerError] = useState(error);
	const [innerLoading, setInnerLoading] = useState(loading);

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
	useEffect(() => {
		setInnerLoading(loading);
	}, [loading]);

	return (
		<View style={[styles.container, style]}>
			{innerLoading ? (
				<ActivityIndicator color="white" style={styles.passcodeContainer} />
			) : (
				<PasscodeInput
					style={styles.passcodeContainer}
					passcode={innerPasscode}
					onChange={handlePasscodeChange}
				/>
			)}
			{innerError && (
				<View style={styles.errorContainer}>
					<Text numberOfLines={2} style={styles.errorMessage}>
						{innerError}
					</Text>
				</View>
			)}

			{isCreate && createPasscodeRef.current.isConfirmation && (
				<View style={styles.commandContainer}>
					<TouchableOpacity onPress={handleResetPasscode}>
						<Text style={styles.newPasscodeText}>Try new passcode?</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default Passcode;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	passcodeContainer: {
		height: 48,
	},
	errorContainer: {
		height: 40,
		justifyContent: 'center',
	},
	errorMessage: {
		color: '#AE3939',
		textAlign: 'center',
	},
	newPasscodeText: {
		textDecorationLine: 'underline',
		color: '#566674',
	},
	commandContainer: {
		minHeight: 30,
		justifyContent: 'center',
	},
});
