import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type {
	NativeSyntheticEvent,
	TextInputKeyPressEventData,
	ViewStyle,
} from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Text, View } from '@walless/gui';

interface Props {
	containerStyle?: ViewStyle;
	isCreate?: boolean;
	error?: string;
	onPasscodeChange?: (
		value: string,
		isCompleted?: boolean,
		isConfirmation?: boolean,
	) => void;
}

export const PasswordFeature: FC<Props> = ({
	containerStyle,
	isCreate = false,
	error = '',
	onPasscodeChange,
}) => {
	const createPasswordRef = useRef({ value: '', isConfirmation: false });
	const [innerError, setInnerError] = useState(error);
	const [password, setPassword] = useState('');

	const handleResetPassword = () => {
		createPasswordRef.current = { value: '', isConfirmation: false };
		setInnerError('');
		onPasscodeChange?.('', false, createPasswordRef.current.isConfirmation);
	};

	const handleChangeText = (value: string) => {
		setPassword(value);
	};

	const handlePressEnter = (
		e: NativeSyntheticEvent<TextInputKeyPressEventData>,
	) => {
		if (e.nativeEvent.key === 'Enter') {
			onPasscodeChange?.(password, true, true);
		}
	};

	useEffect(() => setInnerError(error), [error]);

	return (
		<View style={[styles.container, containerStyle]}>
			<Input onChangeText={handleChangeText} onKeyPress={handlePressEnter} />
			<Text style={styles.errorMessage}>{innerError || ' '}</Text>
			{isCreate && createPasswordRef.current.isConfirmation ? (
				<TouchableOpacity
					style={{ marginTop: 20 }}
					onPress={handleResetPassword}
				>
					<Text style={styles.newPasscodeText}>Try new password?</Text>
				</TouchableOpacity>
			) : (
				<View style={{ marginTop: 20 }}>
					<Text> </Text>
				</View>
			)}
		</View>
	);
};

export default PasswordFeature;

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
