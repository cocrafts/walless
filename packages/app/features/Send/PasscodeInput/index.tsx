import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import type {
	Collectible,
	Networks,
	Token,
	TransactionPayload,
} from '@walless/core';
import type { SlideComponentProps } from '@walless/gui';
import { Text, View } from '@walless/gui';
import { ResponseCode } from '@walless/messaging';
import type { CollectibleDocument } from '@walless/store';
import { useSnapshot } from 'valtio';

import {
	floatActions,
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../state';
import { PasscodeFeature } from '../../Passcode';

import { Header } from './components';

type Props = SlideComponentProps;
const PasscodeInput: FC<Props> = ({ navigator, item, activatedId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { type, token, tokenForFee, nftCollectible, sender, receiver, amount } =
		useSnapshot(transactionContext);
	const [error, setError] = useState<string>('');
	const [passcode, setPasscode] = useState<string>('');
	const [renderPasscode, setRenderPasscode] = useState(false);

	const { createAndSendTransaction, handleSendNftSuccess } =
		useSnapshot(injectedElements);

	const handleBack = () => {
		navigator.slideBack();
		setPasscode('');
		setError('');
	};

	const handlePasscodeChange = async (
		passcode: string,
		isCompleted = false,
	) => {
		setIsLoading(true);
		setPasscode(passcode);
		if (isCompleted) {
			if (
				(type === 'Token' && !token) ||
				(type === 'Collectible' && !nftCollectible)
			)
				return floatActions.showError('Invalid token to transfer');

			const payload: TransactionPayload = {
				sender: sender,
				receiver: receiver,
				tokenForFee: token as Token,
			} as unknown as TransactionPayload;

			switch (type) {
				case 'Token': {
					payload.amount = parseFloat(amount as string);
					payload.token = token as Token;
					payload.network = token?.network as Networks;
					payload.tokenForFee = tokenForFee as Token;
					break;
				}
				case 'Collectible': {
					payload.amount = 1;
					payload.token = nftCollectible as Collectible;
					payload.network = nftCollectible?.network as Networks;
					payload.tokenForFee = tokenForFee as Token;
					break;
				}
			}

			let res;
			try {
				res = await createAndSendTransaction(payload, passcode);
				transactionActions.setTime();
				transactionActions.setStatus(res.responseCode as ResponseCode);

				if (res.responseCode == ResponseCode.WRONG_PASSCODE) {
					floatActions.showError('Passcode is NOT matched');
					setError('Wrong passcode');
				} else if (res.responseCode == ResponseCode.SUCCESS) {
					if (nftCollectible && handleSendNftSuccess)
						handleSendNftSuccess(nftCollectible as CollectibleDocument);
					transactionActions.setSignatureString(
						res.signatureString || res.signedTransaction?.digest || res.hash,
					);
					navigator.slideNext();
				} else if (res.responseCode == ResponseCode.ERROR) {
					navigator.slideNext();
					if (res.message) {
						floatActions.showError(res.message);
					}
				} else {
					floatActions.showError('Something was wrong');
				}
			} catch (error) {
				floatActions.showError((error as Error).message);
			}

			setPasscode('');
		} else if (passcode.length > 0 && error) {
			setError('');
		}

		setIsLoading(false);
	};

	useEffect(() => {
		if (item.id == activatedId) {
			setTimeout(() => setRenderPasscode(true), 200);
		} else setRenderPasscode(false);
	}, [activatedId]);

	return (
		<View style={styles.container}>
			<Header onBack={handleBack} />

			<Image style={styles.icon} source={{ uri: '/img/icon.png' }} />
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
					loading={isLoading}
					onPasscodeChange={handlePasscodeChange}
				/>
			)}
		</View>
	);
};

export default PasscodeInput;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
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
		lineHeight: 18,
		color: '#566674',
		textAlign: 'center',
	},
});
