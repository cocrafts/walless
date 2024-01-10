import type { FC } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { Google } from '@walless/icons';

interface Props {
	isAbleToSignIn?: boolean;
	onGoogleSignIn?: () => void;
	loading?: boolean;
	onGetInvitationCode?: () => void;
}

const SignInInner: FC<Props> = ({
	isAbleToSignIn,
	onGoogleSignIn,
	loading,
	onGetInvitationCode,
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.commandContainer}>
				{loading ? (
					<ActivityIndicator color="white" />
				) : (
					<Button
						disabled={!isAbleToSignIn}
						style={[
							styles.signInButton,
							!isAbleToSignIn && styles.disabledButton,
						]}
						onPress={onGoogleSignIn}
					>
						<Google />
						<Text style={styles.buttonText}>Sign in with Google</Text>
					</Button>
				)}
			</View>

			{isAbleToSignIn ? (
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
			) : (
				<View style={styles.getInvitationCodeContainer}>
					<Text style={styles.subText}>Get your invitation code</Text>
					<TouchableOpacity
						style={styles.textButton}
						onPress={onGetInvitationCode}
					>
						<Text style={styles.clickableText}>here</Text>
					</TouchableOpacity>
				</View>
			)}
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
	},
	signInButton: {
		flexDirection: 'row',
		backgroundColor: '#0694D3',
		gap: 8,
	},
	disabledButton: {
		backgroundColor: '#223240',
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '500',
		color: 'white',
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
	getInvitationCodeContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
	},
	clickableText: {
		fontSize: 14,
		fontWeight: '400',
		color: '#0694D3',
		textAlign: 'center',
		marginTop: -1,
	},
	subText: {
		fontSize: 14,
		color: '#566674',
		fontWeight: '400',
	},
	textButton: {
		backgroundColor: 'transparent',
		padding: 0,
	},
});
