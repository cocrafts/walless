import { type FC, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Networks, Token, TransactionPayload } from '@walless/core';
import { SliderHandle, Text, View } from '@walless/gui';
import { ResponseCode } from '@walless/messaging';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionContext,
} from '../../../state/transaction';
import PasscodeFeature from '../../Passcode';
import { showError } from '../utils';

import { Header } from './components';

interface Props {
	navigator: SliderHandle;
}

const PasscodeInput: FC<Props> = ({ navigator }) => {
	const { token, sender, receiver, amount } = useSnapshot(transactionContext);
	const [error, setError] = useState<string>('');
	const [passcode, setPassode] = useState<string>('');

	const { createAndSendTransaction } = useSnapshot(injectedElements);

	const handleBack = () => {
		navigator.slideBack();
		setPassode('');
		setError('');
	};

	const handlePasscodeChange = async (passcode: string) => {
		setPassode(passcode);
		if (passcode.length == 6) {
			if (!token) return showError('Invalid token to transfer');

			const payload: TransactionPayload = {
				sender: sender,
				receiver: receiver,
				amount: parseFloat(amount as string) * 10 ** token?.account.decimals,
				token: token as Token,
				network: token?.network as Networks,
			};
			let res;
			try {
				res = await createAndSendTransaction(payload, passcode);
				console.log({ res });
				if (res.responseCode == ResponseCode.WRONG_PASSCODE) {
					setError('Wrong passcode');
					setPassode('');
				} else if (res.responseCode == ResponseCode.SUCCESS) {
					navigator.slideNext();
				} else if (res.responseCode == ResponseCode.ERROR) {
					navigator.slideNext();
				} else {
					showError('Something was wrong');
					setPassode('');
				}
				console.log(error);
			} catch (error) {
				console.log(error);
			}
		} else if (passcode.length > 0 && error) {
			setError('');
		}
	};

	return (
		<View style={styles.container}>
			<Header onBack={handleBack} />

			<Image style={styles.icon} source={{ uri: 'img/icon.png' }} />
			<View style={styles.titleBlock}>
				<Text style={styles.title}>Confirm your passcode</Text>
				<Text style={styles.description}>
					{
						"Secure your passcode! It's essential for accessing your account and authorizing transfers."
					}
				</Text>
			</View>
			<PasscodeFeature
				passcode={passcode}
				error={error}
				onPasscodeChange={handlePasscodeChange}
			/>
		</View>
	);
};

export default PasscodeInput;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		gap: 40,
		width: 336,
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
