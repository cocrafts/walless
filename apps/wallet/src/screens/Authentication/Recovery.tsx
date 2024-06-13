import type { FC } from 'react';
import { useState } from 'react';
import type { ViewStyle } from 'react-native';
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Linking,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';
import { Button, Input, Text, View } from '@walless/gui';
import Logo from 'components/Logo';
import { showError } from 'modals/Error';
import { appState } from 'state/app';
import { recoverByEmergencyKey } from 'utils/auth';
import { useSnapshot, useUniversalInsets } from 'utils/hooks';
import { navigate } from 'utils/navigation';
import { hideNativeKeyboard } from 'utils/system';

const WALLESS_EMAIL = 'hello@walless.io';

export const RecoveryScreen: FC = () => {
	const [recoveryKey, setRecoveryKey] = useState('');
	const [loading, setLoading] = useState(false);
	const insets = useUniversalInsets();
	const { config } = useSnapshot(appState);

	const containerStyle: ViewStyle = {
		paddingTop: insets.top,
		paddingBottom: Math.max(insets.bottom, 24),
	};

	const handlePressContinue = async () => {
		setLoading(true);
		const key = recoveryKey.trim();
		if (key && (await recoverByEmergencyKey(key))) {
			navigate('Authentication', { screen: 'CreatePasscode' });
		} else {
			showError({ errorText: 'Wrong recovery key' });
		}
		setLoading(false);
	};

	const handlePressEmail = async () => {
		await Linking.openURL(`mailto:${WALLESS_EMAIL}`);
	};

	return (
		<TouchableWithoutFeedback onPress={hideNativeKeyboard}>
			<View style={[styles.container, containerStyle]}>
				<View />

				<View style={styles.headerContainer}>
					<View style={styles.logoContainer}>
						<Logo />
					</View>
					<Text style={styles.title}>Recovery your account</Text>
					<Text style={styles.subText}>
						Enter your Secret key to get going again
					</Text>
				</View>

				<KeyboardAvoidingView style={styles.formContainer} behavior="padding">
					<Input
						style={styles.inputText}
						placeholder="enter secret key"
						textAlign="center"
						onChangeText={setRecoveryKey}
					/>
					{loading ? (
						<View style={styles.loadingContainer}>
							<ActivityIndicator color={'white'} />
						</View>
					) : (
						<Button
							style={[styles.continueButton]}
							titleStyle={styles.continueButtonTitle}
							title="Continue"
							onPress={handlePressContinue}
							disabled={!recoveryKey.trim()}
						/>
					)}
				</KeyboardAvoidingView>

				{/* <View /> */}

				<View>
					<Text style={styles.reminderText}>
						Upon sign-up, your Secret Key is sent in the Walless Emergency Kit
						to your registered email. If forgotten, contact us at{' '}
						<Text style={styles.email} onPress={handlePressEmail}>
							{WALLESS_EMAIL}
						</Text>
					</Text>
					<Text style={styles.poweredText}>
						Powered by walless.io, version@{config.version}
					</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default RecoveryScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		paddingHorizontal: 36,
		gap: 40,
	},
	headerContainer: {
		marginTop: 48,
		gap: 8,
		alignItems: 'center',
	},
	logoContainer: {
		marginVertical: 14,
	},
	loadingContainer: {
		paddingVertical: 16,
	},
	title: {
		fontSize: 20,
		fontWeight: '400',
		color: '#fff',
		textAlign: 'center',
	},
	subText: {
		color: '#566674',
		textAlign: 'center',
	},
	formContainer: {
		gap: 24,
		marginBottom: 32,
	},
	inputText: {
		height: 52,
		textAlign: 'center',
	},
	continueButtonTitle: {
		fontWeight: '600',
	},
	continueButton: {
		paddingVertical: 16,
	},
	reminderText: {
		fontSize: 12,
		lineHeight: 18,
		color: '#566674',
		textAlign: 'center',
	},
	email: {
		color: '#19A3E1',
	},
	poweredText: {
		fontSize: 12,
		color: '#5D6A73',
		marginTop: 6,
		textAlign: 'center',
	},
});
