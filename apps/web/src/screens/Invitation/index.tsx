import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { InvitationFeature } from '@walless/app';
import { View } from '@walless/gui';
import { appState } from 'state/app';
import { validateInvitationCode } from 'utils/authentication';
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
		<View style={styles.container}>
			<InvitationFeature
				onEnter={onInvitationCodeChange}
				logoSrc={{ uri: '/img/icon-lg.png' }}
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
