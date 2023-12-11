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
import { Button, Input, Text, View } from '@walless/gui';
import { modules } from '@walless/ioc';

import { hideNativeKeyboard } from '../utils';

interface Props {
	style?: ViewStyle;
	onPressContinue: (key?: string) => void;
}

const WALLESS_EMAIL = 'hello@walless.io';

export const Recovery: FC<Props> = ({ style, onPressContinue }) => {
	const [recoveryKey, setRecoveryKey] = useState('');

	const handlePressContinue = () => {
		onPressContinue(recoveryKey.trim());
	};

	const handlePressEmail = async () => {
		await Linking.openURL(`mailto:${WALLESS_EMAIL}`);
	};

	return (
		<TouchableWithoutFeedback onPress={hideNativeKeyboard}>
			<View style={[styles.container, style]}>
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

				<KeyboardAvoidingView
					style={styles.formContainer}
					behavior="padding"
					keyboardVerticalOffset={32}
				>
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

export default Recovery;

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
