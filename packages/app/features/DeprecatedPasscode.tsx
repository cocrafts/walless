import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Image,
	Linking,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { Text, View } from '@walless/gui';

import { PasscodeFeature } from '../features/Passcode';

interface Props {
	validatePasscode: (passcode: string) => Promise<boolean>;
	onSuccess: (passcode: string) => Promise<void>;
}

export const DeprecatedPasscode: FC<Props> = ({
	validatePasscode,
	onSuccess,
}) => {
	const [passcode, setPasscode] = useState('');
	const [passcodeError, setPasscodeError] = useState<string>();
	const [loading, setLoading] = useState(false);
	const title = 'Enter your passcode';

	const onPasscodeChange = async (value: string, isCompleted?: boolean) => {
		setPasscode(value);
		if (passcodeError && value.length > 0) setPasscodeError(undefined);

		if (isCompleted) {
			if (await validatePasscode(passcode)) {
				setLoading(true);
				await onSuccess(passcode);
				setLoading(false);
			} else {
				setPasscodeError('Wrong passcode');
			}
		}
	};

	const onLinkPress = async () => {
		await Linking.openURL('https://discord.gg/3v7jwG45pe');
	};

	useEffect(() => {
		if (passcodeError) {
			setPasscode('');
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

			{loading ? (
				<ActivityIndicator />
			) : (
				<PasscodeFeature
					passcode={passcode}
					error={passcodeError}
					onPasscodeChange={onPasscodeChange}
				/>
			)}

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

export default DeprecatedPasscode;

const styles = StyleSheet.create({
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
		marginHorizontal: 'auto',
		marginTop: 'auto',
	},
	link: {
		color: '#19A3E1',
	},
});
