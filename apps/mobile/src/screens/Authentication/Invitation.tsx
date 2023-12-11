import type { FC } from 'react';
import { useState } from 'react';
import type { ViewStyle } from 'react-native';
import { InvitationFeature, useSafeAreaInsets } from '@walless/app';
import { validateInvitationCode } from '@walless/auth';
import { appState } from '@walless/engine';
import { navigate } from 'utils/navigation';

export const InvitationScreen: FC = () => {
	const [invitationError, setInvitationError] = useState<string>();
	const logoSrc = require('assets/img/icon.png');

	const insets = useSafeAreaInsets();
	const containerStyle: ViewStyle = {
		marginHorizontal: 38,
		marginTop: insets.top,
		marginBottom: insets.bottom,
	};

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
		<InvitationFeature
			onEnter={onInvitationCodeChange}
			logoSrc={logoSrc}
			error={invitationError}
			onLoginPress={handleLoginPress}
			style={containerStyle}
		/>
	);
};

export default InvitationScreen;
