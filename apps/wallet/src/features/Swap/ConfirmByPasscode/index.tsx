import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import type { SlideComponentProps } from '@walless/gui';
import { Hoverable, Passcode, Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';
import assets from 'utils/assets';
import { useSnapshot } from 'utils/hooks';
import { nativeModules } from 'utils/native';

import { swapContext } from '../context';

type Props = SlideComponentProps;

const ConfirmByPasscode: FC<Props> = ({ navigator, activatedId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>('');
	const [passcode, setPasscode] = useState<string>('');
	const { transaction } = useSnapshot(swapContext).swap;

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
			console.log('handle swap transaction', transaction);
			setPasscode('');
		} else if (passcode.length > 0 && error) {
			setError('');
		}

		setIsLoading(false);
	};

	useEffect(() => {
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

			<Passcode
				passcode={passcode}
				error={error}
				loading={isLoading}
				onPasscodeChange={handlePasscodeChange}
			/>
		</View>
	);
};

export default ConfirmByPasscode;

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
