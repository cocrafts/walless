import type { FC } from 'react';
import { useState } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, Linking, StyleSheet } from 'react-native';
import { Button, Input, Text, View } from '@walless/gui';
import { modules } from '@walless/ioc';

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
		<View style={[styles.container, style]}>
			<Image source={modules.asset.misc.walless} style={styles.logo} />

			<View style={styles.titleContainer}>
				<Text style={styles.title}>Recovery your account</Text>
				<Text style={styles.subText}>
					Enter your Secret key to get going again
				</Text>
			</View>

			<View style={styles.lowerContainer}>
				<Input
					style={styles.inputText}
					placeholder="Enter Secret key"
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
				<Text style={styles.reminderText}>
					Upon sign-up, your Secret Key is sent in the Walless Emergency Kit to
					your registered email. If forgotten, contact us at{' '}
					<Text style={styles.email} onPress={handlePressEmail}>
						{WALLESS_EMAIL}
					</Text>
				</Text>
			</View>
		</View>
	);
};

export default Recovery;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 36,
		paddingTop: 50,
		gap: 40,
	},
	logo: {
		width: 83,
		height: 43,
	},
	titleContainer: {
		gap: 8,
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
	lowerContainer: {
		width: '100%',
	},
	inputText: {
		textAlign: 'center',
	},
	continueButtonTitle: {
		fontWeight: '600',
	},
	continueButton: {
		marginTop: 18,
		marginBottom: 14,
	},
	reminderText: {
		fontSize: 10,
		color: '#566674',
		textAlign: 'center',
	},
	email: {
		color: '#19A3E1',
	},
});
