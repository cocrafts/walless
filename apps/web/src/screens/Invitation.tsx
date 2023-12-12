import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { InvitationFeature } from '@walless/app';
import { validateInvitationCode } from '@walless/auth';
import { appState } from '@walless/engine';
import { router } from 'utils/routing';

const InvitationScreen = () => {
	const [invitationError, setInvitationError] = useState<string>();
	appState.isAbleToSignIn = true;

	const onInvitationCodeChange = async (value: string) => {
		if (invitationError && value.length > 0) {
			setInvitationError(undefined);
		}

		try {
			const code = await validateInvitationCode(value);
			appState.invitationCode = code;
			router.navigate('/login');
		} catch (err) {
			setInvitationError((err as Error).message);
		}
	};

	const handleLoginPress = () => {
		setInvitationError(undefined);
		router.navigate('/login');
	};

	return (
		<InvitationFeature
			onEnter={onInvitationCodeChange}
			logoSrc={{ uri: '/img/icon.png' }}
			error={invitationError}
			onLoginPress={handleLoginPress}
			style={styles.container}
		/>
	);
};

export default InvitationScreen;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 38,
		marginBottom: 24,
	},
});
