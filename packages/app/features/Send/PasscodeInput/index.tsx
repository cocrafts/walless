import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import type { Networks, Token, TransactionPayload } from '@walless/core';
import type { SlideComponentProps } from '@walless/gui';
import { Text, View } from '@walless/gui';
import { ResponseCode } from '@walless/messaging';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../state/transaction';
import PasscodeFeature from '../../Passcode';
import { showError } from '../utils';

import { Header } from './components';

type Props = SlideComponentProps;
const PasscodeInput: FC<Props> = ({ navigator, item, activedId }) => {
	const { token, sender, receiver, amount } = useSnapshot(transactionContext);
	const [error, setError] = useState<string>('');
	const [passcode, setPassode] = useState<string>('');
	const [renderPasscode, setRenderPasscode] = useState(false);

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
				transactionActions.setTime();
				transactionActions.setStatus(res.responseCode as ResponseCode);

				if (res.responseCode == ResponseCode.WRONG_PASSCODE) {
					showError('Passcode is NOT matched');
					setError('Wrong passcode');
				} else if (res.responseCode == ResponseCode.SUCCESS) {
					transactionActions.setSignatureString(
						res.signatureString || res.signedTransaction?.digest || res.hash,
					);
					navigator.slideNext();
				} else if (res.responseCode == ResponseCode.ERROR) {
					navigator.slideNext();
					if (res.message) {
						showError(res.message);
					}
				} else {
					showError('Something was wrong');
				}
			} catch (error) {
				showError((error as Error).message);
			}

			setPassode('');
		} else if (passcode.length > 0 && error) {
			setError('');
		}
	};

	useEffect(() => {
		if (item.id == activedId) {
			setTimeout(() => setRenderPasscode(true), 200);
		} else setRenderPasscode(false);
	}, [activedId]);

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
			{renderPasscode && (
				<PasscodeFeature
					passcode={passcode}
					error={error}
					onPasscodeChange={handlePasscodeChange}
				/>
			)}
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
