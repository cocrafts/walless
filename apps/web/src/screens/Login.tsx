import { type FC, useState } from 'react';
import { LoginFeature } from '@walless/app';
import { appState } from '@walless/engine';
import { resources } from 'utils/config';
import { useSnapshot } from 'utils/hooks';
import { router } from 'utils/routing';
import { appActions } from 'utils/state';

export const LoginScreen: FC = () => {
	const [loading, setLoading] = useState(false);
	const { config, invitationCode } = useSnapshot(appState);

	const handleNavigateToGetInvitationCode = () => {
		router.navigate('/invitation', { replace: true });
	};

	const handleSignInWithGoogle = async () => {
		setLoading(true);
		appActions.signInWithGoogle(invitationCode);
		setLoading(false);
	};

	return (
		<LoginFeature
			loading={loading}
			logoSrc={resources.walless.icon}
			onGoogleSignIn={handleSignInWithGoogle}
			onGetInvitationCode={handleNavigateToGetInvitationCode}
			version={config.version}
		/>
	);
};

export default LoginScreen;
