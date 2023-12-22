import type { FC } from 'react';
import { LoginFeature } from '@walless/app';
import { appState } from '@walless/engine';
import { useSafeAreaInsets, useSnapshot } from 'utils/hooks';
import { appActions } from 'utils/state';

export const LoginScreen: FC = () => {
	const insets = useSafeAreaInsets();
	const { authenticationLoading, invitationCode, config } =
		useSnapshot(appState);
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
			version={config?.version}
		/>
	);
};

export default LoginScreen;
