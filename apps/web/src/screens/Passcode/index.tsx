import { useEffect, useState } from 'react';
import { Image, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { useLoaderData } from 'react-router-dom';
import { PasscodeFeature } from '@walless/component';
import { Text, View } from '@walless/gui';
import { appActions } from 'state/app';
import { appState } from 'state/app';
import { useSnapshot } from 'utils/hooks';

interface Params {
	feature: string;
}

export const PasscodeScreen = () => {
	const { passcodeError } = useSnapshot(appState);
	const { feature } = useLoaderData() as Params;
	const isCreate = feature === 'create';
	const [passcode, setPasscode] = useState('');
	const [confirmation, setConfirmation] = useState(false);
	const title = !isCreate
		? 'Enter your passcode'
		: confirmation
		? 'Confirm your passcode'
		: 'Create your passcode';

	const onPasscodeChange = async (
		value: string,
		isCompleted?: boolean,
		isConfirmation?: boolean,
	) => {
		setPasscode(value);
		if (passcodeError && value.length > 0) {
			appState.passcodeError = '';
		}
		if (isCreate) {
			setConfirmation(!!isConfirmation);
			if (isCompleted) {
				appActions.confirmPasscode(value);
			}
		} else {
			if (isCompleted) {
				appActions.recoverWithPasscode(value);
			}
		}
	};

	const onLinkPress = () => {
		Linking.openURL('https://discord.gg/3v7jwG45pe');
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
					isCreate={isCreate}
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 40,
		paddingTop: 50,
		paddingBottom: 20,
		maxWidth: 410,
		maxHeight: 600,
	},
	logo: {
		width: 83,
		height: 43,
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
	footerContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	link: {
		color: '#19A3E1',
	},
});
