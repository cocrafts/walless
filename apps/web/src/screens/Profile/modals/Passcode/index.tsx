import { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { PasscodeFeature } from '@walless/app';
import { type ModalConfigs, Text, View } from '@walless/gui';
import { ResponseCode } from '@walless/messaging';
import {
	type PendingTransactionContext,
	transactionActions,
} from 'state/transaction';

import ModalWrapper from '../components/ModalWrapper';

interface Props {
	config: ModalConfigs & { context: PendingTransactionContext };
}

export const PasscodeScreen: FC<Props> = ({ config }) => {
	const [error, setError] = useState('');
	const [passcode, setPasscode] = useState('');

	const onPasscodeChange = async (value: string, isCompleted?: boolean) => {
		setPasscode(value);
		if (error && value.length > 0) {
			setError('');
		}
		if (isCompleted) {
			console.log(value);
			const res = await transactionActions.createAndSend(config.context, value);

			if (res?.responseCode === ResponseCode.WRONG_PASSCODE) {
				setError('Wrong passcode');
				setPasscode('');
			} else if (res?.responseCode === ResponseCode.ERROR) {
				setError(res.message);
				setPasscode('');
			}
		}
	};

	return (
		<ModalWrapper>
			<View style={styles.container}>
				<Text style={styles.title}>Enter your passcode</Text>
				<PasscodeFeature
					passcode={passcode}
					error={error}
					onPasscodeChange={onPasscodeChange}
				/>
			</View>
		</ModalWrapper>
	);
};

export default PasscodeScreen;

const styles = StyleSheet.create({
	container: {
		minHeight: 500,
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		marginBottom: 40,
	},
});
