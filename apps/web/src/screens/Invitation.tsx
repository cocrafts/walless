import { useEffect, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { InvitationFeature, useUniversalInsets } from '@walless/app';
import { validateInvitationCode } from '@walless/auth';
import { appState } from '@walless/engine';
import { router } from 'utils/routing';

const InvitationScreen = () => {
	const insets = useUniversalInsets();
	const [invitationError, setInvitationError] = useState<string>();
	const containerStyle: ViewStyle = {
		paddingTop: insets.top,
		paddingBottom: Math.max(insets.bottom, 24),
	};

	useEffect(() => {
		appState.isAbleToSignIn = true;
	}, []);

	const onInvitationCodeChange = async (value: string) => {
		if (invitationError && value.length > 0) {
			setInvitationError(undefined);
		}

		try {
			const code = await validateInvitationCode(value);
			appState.invitationCode = code;
			router.navigate('/login', { replace: true });
		} catch (err) {
			setInvitationError((err as Error).message);
		}
	};

	const handleLoginPress = () => {
		setInvitationError(undefined);
		router.navigate('/login', { replace: true });
	};

	return (
		<InvitationFeature
			style={containerStyle}
			onEnter={onInvitationCodeChange}
			logoSrc={{ uri: '/img/icon.png' }}
			error={invitationError}
			onLoginPress={handleLoginPress}
		/>
	);
};

export default InvitationScreen;
