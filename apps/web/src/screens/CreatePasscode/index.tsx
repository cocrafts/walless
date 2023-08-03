import { useEffect, useState } from 'react';
import { Image, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { PasscodeFeature } from '@walless/app';
import { Text, View } from '@walless/gui';
import { appActions } from 'state/app';
import { router } from 'utils/routing';

export const CreatePasscodeScreen = () => {
	const [passcode, setPasscode] = useState('');
	const [confirmation, setConfirmation] = useState(false);
	const [passcodeError, setPasscodeError] = useState<string>();
	const title = confirmation ? 'Confirm your passcode' : 'Create passcode';

	const onPasscodeChange = async (
		value: string,
		isCompleted?: boolean,
		isConfirmation?: boolean,
	) => {
		setPasscode(value);
		if (passcodeError && value.length > 0) setPasscodeError(undefined);

		setConfirmation(!!isConfirmation);
		if (isCompleted) {
			await appActions.initLocalDeviceByPasscodeAndSync(value);
			router.navigate('/');
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
				isCreate={true}
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
	);
};

export default CreatePasscodeScreen;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 40,
		paddingTop: 50,
		paddingBottom: 20,
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
	footerContainer: {
		marginHorizontal: 'auto',
	},
	link: {
		color: '#19A3E1',
	},
});
