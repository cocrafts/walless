import { FC } from 'react';
import { LoginFeature } from '@walless/app';

export const LoginScreen: FC = () => {
	const logoSrc = { uri: '/img/icon.png' };

	return <LoginFeature logoSrc={logoSrc} />;
};

export default LoginScreen;
