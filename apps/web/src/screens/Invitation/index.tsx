import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { InvitationFeature } from '@walless/app';
import { View } from '@walless/gui';
import { appState } from 'state/app';
import { router } from 'utils/routing';
import { useSnapshot } from 'valtio';

const InvitationScreen = () => {
	const [invitationCode, setInvitationCode] = useState('');
	const [isValid, setIsValid] = useState(false);
	const { invitationError } = useSnapshot(appState);

	const validateInvitationCode = (value: string) => {
		console.log('validating...', value);
		return false;
	};

	const onInvitationCodeChange = async (value: string) => {
		setInvitationCode(value);

		setIsValid(validateInvitationCode(value));

		// if (invitationError && value.length > 0) {
		// 	appState.invitationError = '';
		// }

		if (isValid) {
			handleConnect();
		} else {
			appState.invitationError = value;
		}
	};

	const handleNavigateToLogIn = () => {
		router.navigate('/login');
	};

	const handleConnect = () => {
		console.log(invitationCode);
	};

	return (
		<View style={styles.container}>
			<InvitationFeature
				onEnter={onInvitationCodeChange}
				logoSrc={{ uri: '/img/icon-lg.png' }}
				error={invitationError}
				onNavigateToLogIn={handleNavigateToLogIn}
			/>
		</View>
	);
};

export default InvitationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
