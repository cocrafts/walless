import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { InvitationFeature } from '@walless/app';
import { validateInvitationCode } from '@walless/auth';
import { appState } from '@walless/engine';
import { navigate } from 'utils/navigation';

export const InvitationScreen: FC = () => {
	const [invitationError, setInvitationError] = useState<string>();
	const logoSrc = require('assets/img/icon.png');

	const onInvitationCodeChange = async (value: string) => {
		if (invitationError && value.length > 0) {
			setInvitationError(undefined);
		}

		try {
			const code = await validateInvitationCode(value);
			appState.invitationCode = code;
			navigate('Authentication', { screen: 'Login' });
		} catch (err) {
			setInvitationError((err as Error).message);
		}
	};

	const handleLoginPress = () => {
		setInvitationError(undefined);
		navigate('Authentication', { screen: 'Login' });
	};

	return (
		<View style={styles.container}>
			<InvitationFeature
				onEnter={onInvitationCodeChange}
				logoSrc={logoSrc}
				error={invitationError}
				onLoginPress={handleLoginPress}
			/>
		</View>
	);
};

export default InvitationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 38,
	},
});
