import { useEffect, useState } from 'react';
import { Image, Linking, TouchableOpacity } from 'react-native';
import { useLoaderData } from 'react-router-dom';
import { PasscodeFeature } from '@walless/app';
import { signInWithPasscode } from '@walless/auth';
import { Text, View } from '@walless/gui';
import {
	setupRemotePasscode,
	validateAndRecoverWithPasscode,
} from 'utils/authentication/passcode';
import { auth } from 'utils/firebase';
import { router } from 'utils/routing';
import { showError } from 'utils/showError';

import { getScreenTitle, styles } from './shared';

interface Params {
	feature: string;
}

export const PasscodeScreen = () => {
	const { feature } = useLoaderData() as Params;
	const isCreation = feature === 'create';
	const [passcode, setPasscode] = useState('');
	const [confirmation, setConfirmation] = useState(false);
	const [passcodeError, setPasscodeError] = useState<string>();
	const title = getScreenTitle(isCreation, confirmation);

	const onPasscodeChange = async (
		value: string,
		isCompleted?: boolean,
		isConfirmation?: boolean,
	) => {
		setPasscode(value);
		if (passcodeError && value.length > 0) {
			setPasscodeError(undefined);
		}
		if (isCreation) {
			setConfirmation(!!isConfirmation);
			if (isCompleted) {
				await setupRemotePasscode(value);
				await signInWithPasscode(value, auth.currentUser);
				router.navigate('/');
			}
		} else {
			if (isCompleted) {
				try {
					if (await validateAndRecoverWithPasscode(value)) {
						await signInWithPasscode(value, auth.currentUser);
						router.navigate('/');
					} else {
						setPasscodeError('wrong passcode, please try again!');
					}
				} catch {
					await showError('Something went wrong');
					router.navigate('/login');
				}
			}
		}
	};

	const onLinkPress = async () => {
		await Linking.openURL('https://discord.gg/3v7jwG45pe');
	};

	useEffect(() => {
		if (passcodeError) {
			setPasscode('');
		}
	}, [passcodeError]);

	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<Image source={{ uri: '/img/bare-icon.png' }} style={styles.logo} />
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.subText}>
						Secure your passcode! It&apos;s essential for accessing your account
						and authorizing transfers.
					</Text>
				</View>

				<PasscodeFeature
					passcode={passcode}
					isCreate={isCreation}
					error={passcodeError}
					onPasscodeChange={onPasscodeChange}
				/>

				<View style={styles.footerContainer}>
					<Text>
						Having issue with passcode?{' '}
						<TouchableOpacity onPress={onLinkPress}>
							<View cursorPointer noSelect>
								<Text style={styles.link}>Contact us</Text>
							</View>
						</TouchableOpacity>
					</Text>
				</View>
			</View>
		</View>
	);
};

export default PasscodeScreen;
