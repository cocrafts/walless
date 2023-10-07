import type { FC } from 'react';
import { LoginFeature } from '@walless/app';
import { appActions, appState } from 'state/app';
import { useSafeAreaInsets, useSnapshot } from 'utils/hooks';

export const LoginScreen: FC = () => {
	const insets = useSafeAreaInsets();
	const { authenticationLoading, invitationCode } = useSnapshot(appState);
	const logoSrc = require('assets/img/icon.png');
	const containerStyle = {
		paddingTop: insets.top,
		paddingBottom: insets.bottom,
	};

	return (
		<LoginFeature
			style={containerStyle}
			loading={authenticationLoading}
			logoSrc={logoSrc}
			onGoogleSignIn={() => appActions.signInWithGoogle(invitationCode)}
		/>
	);
};

export default LoginScreen;
