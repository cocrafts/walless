import { FC } from 'react';
import { LoginFeature } from '@walless/app';
import { appActions, appState } from 'state/app';
import { resources } from 'utils/config';
import { useSnapshot } from 'utils/hooks';

export const LoginScreen: FC = () => {
	const { authenticationLoading } = useSnapshot(appState);

	return (
		<LoginFeature
			loading={authenticationLoading}
			logoSrc={resources.walless.icon}
			onGoogleSignIn={appActions.signInWithGoogle}
		/>
	);
};

export default LoginScreen;
