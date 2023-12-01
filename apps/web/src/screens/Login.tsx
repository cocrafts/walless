import type { FC } from 'react';
import { LoginFeature } from '@walless/app';
import { appState } from '@walless/engine';
import { resources } from 'utils/config';
import { useSnapshot } from 'utils/hooks';
import { router } from 'utils/routing';
import { appActions } from 'utils/state';

export const LoginScreen: FC = () => {
	const {
		config,
		authenticationLoading,
		invitationCode,
		isAbleToSignIn,
		signInError,
	} = useSnapshot(appState);

	const handleNavigateToGetInvitationCode = () => {
		router.navigate('/invitation');
		appState.isAbleToSignIn = true;
	};

	return (
		<LoginFeature
			loading={authenticationLoading}
			logoSrc={resources.walless.icon}
			onGoogleSignIn={() => appActions.signInWithGoogle(invitationCode)}
			isAbleToSignIn={isAbleToSignIn}
			onGetInvitationCode={handleNavigateToGetInvitationCode}
			error={signInError}
			version={config.version}
		/>
	);
};

export default LoginScreen;
