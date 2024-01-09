import type { FC } from 'react';
import { useState } from 'react';
import type { ViewStyle } from 'react-native';
import {
	Image,
	KeyboardAvoidingView,
	Linking,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';
import { recoverByEmergencyKey } from '@walless/auth';
import { Button, Input, Text, View } from '@walless/gui';
import { modules } from '@walless/ioc';
import { showError } from 'modals/Error';
import { useUniversalInsets } from 'utils/hooks';
import { navigate } from 'utils/navigation';
import { hideNativeKeyboard } from 'utils/system';

const WALLESS_EMAIL = 'hello@walless.io';

export const RecoveryScreen: FC = () => {
	const [recoveryKey, setRecoveryKey] = useState('');
	const insets = useUniversalInsets();

	const containerStyle: ViewStyle = {
		marginTop: insets.top,
		marginBottom: Math.max(insets.bottom, 24),
	};

	const handlePressContinue = async () => {
		const key = recoveryKey.trim();
		if (key && (await recoverByEmergencyKey(key))) {
			navigate('Authentication', { screen: 'CreatePasscode' });
		} else {
			showError({ errorText: 'Wrong recovery key' });
		}
	};

	const handlePressEmail = async () => {
		await Linking.openURL(`mailto:${WALLESS_EMAIL}`);
	};

	return (
		<TouchableWithoutFeedback onPress={hideNativeKeyboard}>
			<View style={[styles.container, containerStyle]}>
				<View />

				<View style={styles.headerContainer}>
					<Image
						source={modules.asset.misc.walless}
						style={styles.logo}
						resizeMode="cover"
					/>
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
					<Button
						style={[styles.continueButton]}
						titleStyle={styles.continueButtonTitle}
						title="Continue"
						onPress={handlePressContinue}
						disabled={!recoveryKey.trim()}
					/>
				</KeyboardAvoidingView>

				<View />
				<Text style={styles.reminderText}>
					Upon sign-up, your Secret Key is sent in the Walless Emergency Kit to
					your registered email. If forgotten, contact us at{' '}
					<Text style={styles.email} onPress={handlePressEmail}>
						{WALLESS_EMAIL}
					</Text>
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default RecoveryScreen;

const logoSize = 120;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		paddingHorizontal: 36,
		gap: 40,
	},
	logo: {
		marginTop: 48,
		width: logoSize,
		height: logoSize,
	},
	headerContainer: {
		gap: 8,
		alignItems: 'center',
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
		height: 52,
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
});
