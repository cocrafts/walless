import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import type { VersionedTransaction } from '@solana/web3.js';
import { logger, Networks, ResponseCode } from '@walless/core';
import type { SlideComponentProps } from '@walless/gui';
import { Hoverable, Passcode, Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';
import { engine } from 'engine';
import type { SolanaContext } from 'engine/runners';
import { showError } from 'modals/Error';
import assets from 'utils/assets';
import { nativeModules } from 'utils/native';
import { signAndSendTransaction } from 'utils/transaction/solana';
import { getAliasedMint } from 'utils/transaction/solana/swap';
import { constructSwapTransaction } from 'utils/transaction/solana/swap';

import { swapActions, swapContext } from '../context';

type Props = SlideComponentProps;
type Status = 'init' | 'building' | 'sending' | 'processing' | 'finalizing';

const ConfirmPasscode: FC<Props> = ({ navigator, item, activatedId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>('');
	const [passcode, setPasscode] = useState<string>('');
	const [renderPasscode, setRenderPasscode] = useState(false);
	const [status, setStatus] = useState<Status>('init');

	const handleBack = () => {
		navigator.slideBack();
		setPasscode('');
		setError('');
		setIsLoading(false);
		setStatus('init');
	};

	const handlePasscodeChange = async (
		passcode: string,
		isCompleted = false,
	) => {
		setPasscode(passcode);
		if (!isCompleted) {
			if (passcode.length > 0) setError('');
			return;
		}

		const { fromToken, toToken, amount, publicKey } = swapContext.swap;
		if (!fromToken || !toToken || !amount || !publicKey)
			throw Error('Swap context must be prepared');

		const fromMint = getAliasedMint(fromToken);
		const amountValue = parseFloat(amount);

		setIsLoading(true);
		let transaction: VersionedTransaction;
		setStatus('building');
		try {
			transaction = await constructSwapTransaction({
				fromMint: fromMint,
				toMint: toToken.address,
				amount: amountValue * 10 ** fromToken.decimals, // jupiter uses int amount with decimals
				userPublicKey: publicKey.toString(),
				wrapAndUnwrapSol: true,
			});
		} catch (error) {
			showError({ errorText: (error as Error).message });
			setPasscode('');
			setStatus('init');
			return;
		}

		setStatus('sending');
		try {
			const fiveMinutesTimeout = 1000 * 60 * 1;
			const { responseCode, signatureString: signature } =
				await signAndSendTransaction(
					transaction,
					passcode,
					{ manuallyRetry: true },
					fiveMinutesTimeout,
				);

			if (responseCode === ResponseCode.WRONG_PASSCODE) {
				showError({ errorText: 'Passcode is NOT matched' });
				setError('Wrong passcode');
			} else if (responseCode === ResponseCode.SUCCESS) {
				const { connection } = engine.getContext<SolanaContext>(
					Networks.solana,
				);

				setStatus('processing');

				connection.onSignature(
					signature,
					() => {
						setStatus('finalizing');
					},
					'confirmed',
				);

				connection.onSignature(
					signature,
					async () => {
						const status = await connection.getSignatureStatus(signature);
						if (!status.value?.err) {
							setRenderPasscode(false);
							swapActions.closeSwap();
							swapActions.showSuccess();
						} else {
							logger.error('failed to wait signature:', error);
							swapActions.closeSwap();
							showError({ errorText: 'Failed to wait for signature status' });
						}

						setStatus('init');
						setIsLoading(false);
					},
					'finalized',
				);
			}

			setPasscode('');
		} catch (error) {
			logger.error('failed to sign and send swap transaction:', error);
			showError({ errorText: 'Can not send transaction, try again!' });
			setPasscode('');
			setIsLoading(false);
			setStatus('init');
		}
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

			<View style={styles.statusContainer}>
				{status === 'building' ? (
					<Text>Constructing...</Text>
				) : status === 'sending' ? (
					<Text>Sending...</Text>
				) : status === 'processing' ? (
					<Text>Processing...</Text>
				) : (
					status === 'finalizing' && <Text>Finalizing...</Text>
				)}
			</View>
		</View>
	);
};

export default ConfirmPasscode;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	closeButton: {
		marginRight: 'auto',
		marginBottom: 40,
	},
	icon: {
		width: 120,
		height: 60,
	},
	titleBlock: {
		alignItems: 'center',
		gap: 10,
		marginVertical: 40,
	},
	title: {
		fontSize: 20,
	},
	description: {
		lineHeight: 18,
		color: '#566674',
		textAlign: 'center',
	},
	statusContainer: {
		alignItems: 'center',
	},
});
