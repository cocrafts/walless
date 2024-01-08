import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import type { SlideComponentProps } from '@walless/gui';
import { Passcode, Text, View } from '@walless/gui';
import { modules } from '@walless/ioc';
import { ResponseCode } from '@walless/messaging';
import type { TokenDocument } from '@walless/store';
import { showError } from 'state/float/system';
import { createAndSend, prepareTransactionPayload } from 'utils/transaction';
import { useSnapshot } from 'valtio';

import { txActions, txContext } from '../context';

import { Header } from './Header';

type Props = SlideComponentProps;
const PasscodeInput: FC<Props> = ({ navigator, item, activatedId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { type, token, tokenForFee, collectible, sender, receiver, amount } =
		useSnapshot(txContext);

	const [error, setError] = useState<string>('');
	const [passcode, setPasscode] = useState<string>('');
	const [renderPasscode, setRenderPasscode] = useState(false);

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
			const element = type === 'Token' ? token : collectible;
			if (!element) {
				return showError('Invalid token to transfer');
			}

			const payload = prepareTransactionPayload(
				element as never,
				sender,
				receiver,
				amount as string,
				tokenForFee as TokenDocument,
			);

			try {
				const res = await createAndSend(payload, passcode);
				txActions.setTime();
				txActions.setStatus(res.responseCode as ResponseCode);

				if (res.responseCode == ResponseCode.WRONG_PASSCODE) {
					showError('Passcode is NOT matched');
					setError('Wrong passcode');
				} else if (res.responseCode == ResponseCode.SUCCESS) {
					txActions.setSignatureString(
						res.signatureString || res.signedTransaction?.digest || res.hash,
					);
					navigator.slideNext();
				}
			} catch (error) {
				showError((error as Error).message);
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

		if (activatedId === 'PasscodeInput') {
			modules.native.retrieveEncryptionKey().then((key: string | null) => {
				if (key) {
					handlePasscodeChange(key as string, true);
				}
			});
		}
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
				<Passcode
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