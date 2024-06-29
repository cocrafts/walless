import type { FC } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { Google } from '@walless/icons';

interface Props {
	onGoogleSignIn?: () => void;
	loading?: boolean;
	onGetInvitationCode?: () => void;
}

const SignInInner: FC<Props> = ({ onGoogleSignIn, loading }) => {
	return (
		<View style={styles.container}>
			<View style={styles.commandContainer}>
				{loading ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator color="white" />
					</View>
				) : (
					<Button style={styles.signInButton} onPress={onGoogleSignIn}>
						<Google />
						<Text style={styles.buttonText}>Sign in with Google</Text>
					</Button>
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
	},
	loadingContainer: {
		paddingVertical: 13,
	},
	signInButton: {
		flexDirection: 'row',
		backgroundColor: '#0694D3',
		gap: 8,
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
	subText: {
		fontSize: 14,
		color: '#566674',
		fontWeight: '400',
	},
});
