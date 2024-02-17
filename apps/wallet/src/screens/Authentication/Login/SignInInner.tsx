import type { FC } from 'react';
import { Fragment } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import { runtime } from '@walless/core';
import { Button, Text, View } from '@walless/gui';
import { Apple, Google } from '@walless/icons';

interface Props {
	onGoogleSignIn?: () => void;
	onAppleSignIn?: () => void;
	loading?: boolean;
	onGetInvitationCode?: () => void;
}

const SignInInner: FC<Props> = ({ onGoogleSignIn, onAppleSignIn, loading }) => {
	const isAppleSignInSupported = runtime.isIOS || appleAuthAndroid.isSupported;

	return (
		<View style={styles.container}>
			<View style={styles.commandContainer}>
				{loading ? (
					<ActivityIndicator color="white" />
				) : (
					<Fragment>
						<Button style={styles.signInButton} onPress={onGoogleSignIn}>
							<Google />
							<Text style={styles.buttonText}>Sign in with Google</Text>
						</Button>

						{isAppleSignInSupported && (
							<Button
								style={[styles.signInButton, styles.appleButton]}
								onPress={onAppleSignIn}
							>
								<Apple color="black" />
								<Text style={[styles.buttonText, styles.appleButtonText]}>
									Sign in with Apple
								</Text>
							</Button>
						)}
					</Fragment>
				)}
			</View>

			<View style={styles.advancedModeContainer}>
				<View style={styles.separateContainer}>
					<View style={styles.line} />
					<Text style={styles.subText}>Advanced mode</Text>
					<View style={styles.line} />
				</View>

				<Button
					style={styles.seedPhraseButton}
					disabled
					title="Create or Import"
					titleStyle={styles.buttonText}
				/>
			</View>
		</View>
	);
};

export default SignInInner;

const styles = StyleSheet.create({
	container: {
		gap: 28,
		paddingHorizontal: 36,
	},
	commandContainer: {
		justifyContent: 'center',
		gap: 24,
	},
	signInButton: {
		flexDirection: 'row',
		gap: 8,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '500',
		color: 'white',
	},
	appleButton: {
		backgroundColor: 'white',
	},
	appleButtonText: {
		color: 'black',
	},
	advancedModeContainer: {
		gap: 24,
	},
	separateContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
	line: {
		flex: 1,
		height: 1,
		backgroundColor: '#2A333C',
	},
	seedPhraseButton: {
		backgroundColor: '#243F56',
	},
	subText: {
		fontSize: 14,
		color: '#566674',
		fontWeight: '400',
	},
});
