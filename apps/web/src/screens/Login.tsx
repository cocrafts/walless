import { type FC } from 'react';
import { LoginFeature } from '@walless/app';
import { appActions, appState } from 'state/app';
import { resources } from 'utils/config';
import { useSnapshot } from 'utils/hooks';
import { router } from 'utils/routing';

export const LoginScreen: FC = () => {
	const { authenticationLoading } = useSnapshot(appState);
	const { invitationCode } = useSnapshot(appState);
	const { isAbleToSignIn } = useSnapshot(appState);
	const { signInError } = useSnapshot(appState);

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
		/>
	);
};

export default LoginScreen;
