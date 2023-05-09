import { useState } from 'react';
import { Image, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { InvitationFeature } from '@walless/app';
import { Anchor, Text, View } from '@walless/gui';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

import Button from './Button';

const InvitationScreen = () => {
	const [invitationCode, setInvitationCode] = useState('');
	const [isValid, setIsValid] = useState(false);
	const { invitationError } = useSnapshot(appState);
	const title = "You're almost there!";

	const validateInvitationCode = async (value: string) => {
		console.log('validating...', value);
		return false;
	};

	const onInvitationCodeChange = async (value: string) => {
		setInvitationCode(value);

		const isValid = await validateInvitationCode(value);
		setIsValid(isValid);

		if (invitationError && value.length > 0) {
			appState.invitationError = '';
		}
	};

	const handleConnect = () => {
		console.log(invitationCode);
	};

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

				<InvitationFeature onInvitationCodeChange={onInvitationCodeChange} />

				<View style={styles.noInvitationCodeContainer}>
					<Text>
						No code?{' '}
						<TouchableOpacity>
							{' '}
							<Anchor href="https://discord.gg/3v7jwG45pe">
								<View cursorPointer noSelect>
									<Text style={styles.link}>Click here</Text>
								</View>
							</Anchor>
						</TouchableOpacity>
					</Text>
				</View>

				<View style={styles.buttonContainer}>
					<Button content="Connect" isValid={isValid} onPress={handleConnect} />
				</View>
			</View>
		</View>
	);
};

export default InvitationScreen;

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
	noInvitationCodeContainer: {
		flex: 1,
		marginTop: 20,
		justifyContent: 'flex-start',
	},
	link: {
		color: '#19A3E1',
	},
	buttonContainer: {
		marginBottom: 50,
	},
});
