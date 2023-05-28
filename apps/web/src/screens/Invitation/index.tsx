import { StyleSheet } from 'react-native';
import { InvitationFeature } from '@walless/app';
import { View } from '@walless/gui';
import { appState } from 'state/app';
import { enterInvitationCode } from 'state/app/authentication';
import { router } from 'utils/routing';
import { useSnapshot } from 'valtio';

const InvitationScreen = () => {
	const { invitationError } = useSnapshot(appState);
	appState.isAbleToSignIn = true;

	const onInvitationCodeChange = (value: string) => {
		if (invitationError && value.length > 0) {
			appState.invitationError = '';
		}

		enterInvitationCode(value);
	};

	const handleLoginPress = () => {
		appState.invitationError = undefined;
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
