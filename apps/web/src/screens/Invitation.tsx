import { type FC } from 'react';
import { InvitationFeature } from '@walless/app';
import { appActions, appState } from 'state/app';
import { resources } from 'utils/config';
import { useSnapshot } from 'utils/hooks';

export const LoginScreen: FC = () => {
	const { invitationError } = useSnapshot(appState);

	return (
		<InvitationFeature
			onEnter={appActions.enterInvitationCode}
			logoSrc={resources.walless.icon}
			error={invitationError}
		/>
	);
};

export default LoginScreen;
