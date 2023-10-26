import type { FC } from 'react';
import { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { PasscodeFeature } from '@walless/app';
import { ModalConfigs, Text, View } from '@walless/gui';
import type { ResponsePayload } from '@walless/messaging';
import { ResponseCode } from '@walless/messaging';

export interface RequirePasscodeModalConfig {
	title?: string;
	desc?: string;
	onPasscodeComplete: (passcode: string) => Promise<{
		responseCode?: ResponseCode;
		message?: string;
	}>;
	onActionComplete?: () => void;
}

interface Props {
	config: ModalConfigs;
}

export const RequirePasscodeModal: FC<Props> = ({ config }) => {
	const { context } = config;
	const {
		title = 'Action requires passcode',
		desc: description = "Secure your passcode! It's essential for accessing your account and authorizing transfers.",
		onPasscodeComplete,
		onActionComplete,
	} = context as RequirePasscodeModalConfig;

	const [error, setError] = useState('');
	const [passcode, setPasscode] = useState('');

	const onPasscodeChange = async (value: string, isCompleted?: boolean) => {
		setPasscode(value);
		if (error && value.length > 0) {
			setError('');
		}
		if (isCompleted) {
			const res: ResponsePayload = await onPasscodeComplete(value);

			if (res?.responseCode === ResponseCode.WRONG_PASSCODE) {
				setError('Wrong passcode');
				setPasscode('');
			} else if (res?.responseCode === ResponseCode.ERROR) {
				setError(res.message || '');
				setPasscode('');
			} else {
				onActionComplete?.();
			}
		}
	};

	return (
		<View style={styles.container}>
			<Image style={styles.icon} source={{ uri: '/img/icon.png' }} />

			<View style={styles.titleBlock}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>

			<PasscodeFeature
				passcode={passcode}
				error={error}
				onPasscodeChange={onPasscodeChange}
			/>
		</View>
	);
};

export default RequirePasscodeModal;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#19232C',
		alignItems: 'center',
		paddingTop: 40,
		paddingHorizontal: 30,
		gap: 40,
	},
	icon: {
		width: 120,
		height: 60,
	},
	titleBlock: {
		alignItems: 'center',
		gap: 10,
	},
	title: {
		fontSize: 20,
	},
	description: {
		fontSize: 14,
		lineHeight: 18,
		color: '#566674',
		textAlign: 'center',
	},
});
