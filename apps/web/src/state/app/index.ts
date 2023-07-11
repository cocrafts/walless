import { appState } from '@walless/app';

import {
	confirmPasscode,
	enterInvitationCode,
	recoverWithPasscode,
	setProfile,
	signInWithGoogle,
} from './authentication';
import { notify, showSendModal } from './modal';
import { setPathname, setPrivacy } from './settings';
import { bootstrap, launchApp } from './splash';
import { copy } from './system';

export const appActions = {
	bootstrap,
	copy,
	launchApp,
	notify,
	setProfile,
	signInWithGoogle,
	enterInvitationCode,
	confirmPasscode,
	recoverWithPasscode,
	setLoading: (flag: boolean): void => {
		appState.loading = flag;
	},
	showSendModal,
	setPrivacy,
	setPathname,
};

export { type AppState, appState } from '@walless/app';
