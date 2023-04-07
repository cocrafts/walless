import { FC } from 'react';
import { LoginFeature } from '@walless/app';
import { appActions } from 'state/app';

export const LoginScreen: FC = () => {
	const logoSrc = { uri: '/img/icon.png' };

	return (
		<LoginFeature logoSrc={logoSrc} onGoogleSignIn={appActions.signInGoogle} />
	);
};

export default LoginScreen;
