import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import { logger } from '@walless/core';
import type { SlideComponentProps } from '@walless/gui';
import { Passcode, Text, View } from '@walless/gui';
import { showError } from 'modals/Error';
import assets from 'utils/assets';
import { nativeModules } from 'utils/native';

import { txActions, useTransactionContext } from '../internal';

import { Header } from './Header';

type Props = SlideComponentProps;
const PasscodeInput: FC<Props> = ({ navigator, item, activatedId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>('');
	const [passcode, setPasscode] = useState<string>('');
	const [renderPasscode, setRenderPasscode] = useState(false);
	const { status } = useTransactionContext();

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
			try {
				await txActions.handleSendTransaction(passcode, () => {
					navigator.slideNext();
				});
			} catch (error) {
				logger.error('failed to send transaction', error);
				showError({ errorText: 'Something went wrong.' });
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
			nativeModules.retrieveEncryptionKey().then((key: string | null) => {
				if (key) {
					handlePasscodeChange(key as string, true);
				}
			});
		}
	}, [activatedId]);

	return (
		<View style={styles.container}>
			<Header onBack={handleBack} />

			<Image style={styles.icon} source={assets.misc.walless} />
			<View style={styles.titleBlock}>
				<Text style={styles.title}>Confirm your passcode</Text>
				<Text style={styles.description}>
					{
						"Secure your passcode! It's essential for accessing your account and authorizing transfers."
					}
				</Text>
			</View>
			{status === 'pending' || status === 'finalizing' ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator />
					{status === 'pending' ? (
						<Text>Processing...</Text>
					) : (
						status === 'finalizing' && <Text>Finalizing...</Text>
					)}
				</View>
			) : (
				renderPasscode && (
					<Passcode
						passcode={passcode}
						error={error}
						loading={isLoading}
						onPasscodeChange={handlePasscodeChange}
					/>
				)
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
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 6,
	},
});
