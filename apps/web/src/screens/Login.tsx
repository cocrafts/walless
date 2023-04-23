import { FC } from 'react';
import { LoginFeature } from '@walless/app';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'utils/hooks';

export const LoginScreen: FC = () => {
	const { authenticationLoading } = useSnapshot(appState);
	const logoSrc = { uri: '/img/icon.png' };

	return (
		<LoginFeature
			loading={authenticationLoading}
			logoSrc={logoSrc}
			onGoogleSignIn={appActions.signInGoogle}
		/>
	);
};

export default LoginScreen;
