import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
	Image,
	Linking,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { Passcode, Text, View } from '@walless/gui';
import { useBiometricStatus, useSafeAreaInsets } from 'hooks';
import { showError } from 'modals/Error';
import { signInWithPasscode } from 'utils/auth';
import { auth } from 'utils/firebase';
import { hydrateEncryptionKey } from 'utils/native';
import { navigate, ResetAnchors, resetRoute } from 'utils/navigation';

import BiometricIcon from '../BiometricIcon';

export const CreatePasscodeScreen: FC = () => {
	const biometricStatus = useBiometricStatus();
	const [passcode, setPasscode] = useState('');
	const [confirmation, setConfirmation] = useState(false);
	const [passcodeError, setPasscodeError] = useState<string>();
	const [loading, setLoading] = useState(false);
	const insets = useSafeAreaInsets();

	const title = confirmation ? 'Confirm your passcode' : 'Create passcode';
	const style = {
		paddingTop: insets.top,
		paddingBottom: insets.bottom,
	};

	const handleInitFail = () => {
		showError({
			errorText: 'Something went wrong. Please try again.',
		});
		navigate('Authentication', { screen: 'Login' });
	};

	const handleOnComplete = async (passcode: string) => {
		if (biometricStatus.isAvailable) {
			await hydrateEncryptionKey(passcode);
		}

		await signInWithPasscode(passcode, auth().currentUser, handleInitFail);
		resetRoute(ResetAnchors.Widget, { id: 'explorer' });
	};

	const onPasscodeChange = async (
		value: string,
		isCompleted?: boolean,
		isConfirmation?: boolean,
	) => {
		setPasscode(value);
		if (passcodeError && value.length > 0) setPasscodeError('');

		setConfirmation(!!isConfirmation);
		if (isCompleted) {
			setLoading(true);
			setTimeout(() => {
				handleOnComplete(value);
			}, 0);
		}
	};

	const onLinkPress = async () => {
		await Linking.openURL('https://discord.gg/3v7jwG45pe');
	};

	const biometricIcon = biometricStatus.isAvailable && (
		<BiometricIcon status={biometricStatus} />
	);

	useEffect(() => {
		if (passcodeError) {
			setPasscode('');
			setLoading(false);
		}
	}, [passcodeError]);

	return (
		<View style={[styles.container, style]}>
			<ScrollView
				style={styles.contentContainer}
				contentContainerStyle={styles.scrollContentContainer}
			>
				<Image source={{ uri: '/img/bare-icon.png' }} style={styles.logo} />

				<View style={styles.titleContainer}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.subText}>
						Secure your passcode! It&apos;s essential for accessing your account
						and authorizing transfers.
					</Text>
				</View>

				<Passcode
					style={styles.passcodeContainer}
					passcode={passcode}
					isCreate={true}
					error={passcodeError}
					loading={loading}
					onPasscodeChange={onPasscodeChange}
				/>
				{biometricIcon}
			</ScrollView>

			<View style={styles.footerContainer}>
				<Text>Having issue with passcode? </Text>
				<TouchableOpacity onPress={onLinkPress}>
					<View cursorPointer noSelect>
						<Text style={styles.link}>Contact us</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CreatePasscodeScreen;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 20,
	},
	contentContainer: {
		flex: 1,
	},
	scrollContentContainer: {
		paddingTop: 50,
		paddingHorizontal: 40,
	},
	logo: {
		width: 83,
		height: 43,
		marginHorizontal: 'auto',
	},
	titleContainer: {
		paddingVertical: 40,
	},
	title: {
		paddingBottom: 10,
		fontSize: 20,
		textAlign: 'center',
	},
	subText: {
		color: '#566674',
		textAlign: 'center',
	},
	passcodeContainer: {
		marginBottom: 24,
	},
	footerContainer: {
		flexDirection: 'row',
		marginTop: 'auto',
		justifyContent: 'center',
	},
	link: {
		color: '#19A3E1',
	},
});
