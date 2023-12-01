import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Image, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@walless/gui';

import PasscodeFeature from '../features/Passcode';

interface Props {
	onComplete?: (passcode: string) => void;
}

export const CreatePasscode: FC<Props> = ({ onComplete }) => {
	const [passcode, setPasscode] = useState('');
	const [confirmation, setConfirmation] = useState(false);
	const [passcodeError, setPasscodeError] = useState<string>();
	const [loading, setLoading] = useState(false);
	const title = confirmation ? 'Confirm your passcode' : 'Create passcode';

	const onPasscodeChange = async (
		value: string,
		isCompleted?: boolean,
		isConfirmation?: boolean,
	) => {
		setPasscode(value);
		if (passcodeError && value.length > 0) setPasscodeError('');

		setConfirmation(!!isConfirmation);
		if (isCompleted) {
			setLoading(true);
			setTimeout(() => {
				onComplete?.(value);
			}, 0);
		}
	};

	const onLinkPress = async () => {
		await Linking.openURL('https://discord.gg/3v7jwG45pe');
	};

	useEffect(() => {
		if (passcodeError) {
			setPasscode('');
			setLoading(false);
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
				loading={loading}
				onPasscodeChange={onPasscodeChange}
			/>

			<View style={styles.footerContainer}>
				<Text>Having issue with passcode? </Text>
				<TouchableOpacity onPress={onLinkPress}>
					<View cursorPointer noSelect>
						<Text style={styles.link}>Contact us</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CreatePasscode;

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
		flexDirection: 'row',
		marginTop: 'auto',
		justifyContent: 'center',
	},
	link: {
		color: '#19A3E1',
	},
});
