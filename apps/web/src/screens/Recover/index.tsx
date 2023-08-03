import { useRef } from 'react';
import { Image, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Input, Text, View } from '@walless/gui';
import { recoverByRecoveryKey } from 'utils/authentication';
import { router } from 'utils/routing';
import { showError } from 'utils/showError';

export const RecoveryScreen = () => {
	const recoveryKey = useRef<string>();

	const handleChangeText = (text: string) => {
		recoveryKey.current = text;
	};

	const handlePressContinue = async () => {
		if (
			recoveryKey.current &&
			(await recoverByRecoveryKey(recoveryKey.current))
		) {
			router.navigate('/create-passcode');
		} else {
			showError('Wrong  recovery key');
		}
	};

	const onLinkPress = async () => {
		await Linking.openURL('https://discord.gg/3v7jwG45pe');
	};

	return (
		<View style={styles.container}>
			<Image source={{ uri: '/img/bare-icon.png' }} style={styles.logo} />

			<View style={styles.titleContainer}>
				<Text style={styles.title}>Recovery account</Text>
				<Text style={styles.subText}>
					Please input your recovery key to sign-in
				</Text>
			</View>

			<View>
				<Input style={styles.recoveryInput} onChangeText={handleChangeText} />
				<Button
					titleStyle={styles.continueButtonTitle}
					title="Continue"
					onPress={handlePressContinue}
				/>
			</View>

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

export default RecoveryScreen;

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
	recoveryInput: {
		marginBottom: 10,
	},
	continueButtonTitle: {
		fontWeight: '600',
	},
	footerContainer: {
		marginTop: 'auto',
		marginHorizontal: 'auto',
	},
	link: {
		color: '#19A3E1',
	},
});
