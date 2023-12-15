import type { FC } from 'react';
import { LoginFeature } from '@walless/app';
import { appState } from '@walless/engine';
import { appActions } from 'state/app';
import { asset } from 'utils/config';
import { useSafeAreaInsets, useSnapshot } from 'utils/hooks';

export const LoginScreen: FC = () => {
	const insets = useSafeAreaInsets();
	const { authenticationLoading, invitationCode, config } =
		useSnapshot(appState);
	const containerStyle = {
		paddingTop: insets.top,
		paddingBottom: insets.bottom,
	};

	return (
		<LoginFeature
			style={containerStyle}
			loading={authenticationLoading}
			logoSrc={asset.misc.walless}
			onGoogleSignIn={() => appActions.signInWithGoogle(invitationCode)}
			version={config?.version}
		/>
	);
};

export default LoginScreen;
