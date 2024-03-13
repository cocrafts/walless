import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { logger, ResponseCode } from '@walless/core';
import type { SlideComponentProps } from '@walless/gui';
import { Hoverable, Passcode, Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';
import { showError } from 'modals/Error';
import assets from 'utils/assets';
import { nativeModules } from 'utils/native';
import { signAndSendTransaction } from 'utils/transaction/solana';

import { swapActions, swapContext } from '../context';

type Props = SlideComponentProps;

const ConfirmPasscode: FC<Props> = ({ navigator, item, activatedId }) => {
	const [isLoading, setIsLoading] = useState(false);
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
			if (!swapContext.swap.transaction) return;
			try {
				const fiveMinutesTimeout = 1000 * 60 * 5;
				const res = await signAndSendTransaction(
					swapContext.swap.transaction,
					passcode,
					{ manuallyRetry: true },
					fiveMinutesTimeout,
				);
				if (res.responseCode === ResponseCode.WRONG_PASSCODE) {
					showError({ errorText: 'Passcode is NOT matched' });
					setError('Wrong passcode');
				} else if (res.responseCode === ResponseCode.SUCCESS) {
					swapActions.closeSwap();
					swapActions.showSuccess();
				}

				setPasscode('');
			} catch (error) {
				logger.error('failed to sign and send swap transaction', error);
				showError({ errorText: 'Something went wrong' });
				setPasscode('');
			}
		} else if (passcode.length > 0 && error) {
			setError('');
		}

		setIsLoading(false);
	};

	useEffect(() => {
		if (item.id == activatedId) {
			setTimeout(() => setRenderPasscode(true), 200);
			nativeModules.retrieveEncryptionKey().then((key: string | null) => {
				if (key) {
					handlePasscodeChange(key as string, true);
				}
			});
		} else setRenderPasscode(false);
	}, [activatedId]);

	return (
		<View style={styles.container}>
			<Hoverable style={styles.closeButton} onPress={handleBack}>
				<ChevronLeft size={16} />
			</Hoverable>

			<Image style={styles.icon} source={assets.misc.walless} />
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

export default ConfirmPasscode;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 40,
	},
	closeButton: {
		marginRight: 'auto',
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
