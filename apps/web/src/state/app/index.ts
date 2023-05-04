import { appState } from '@walless/app';

import { copy } from './actions';
import {
	confirmPasscode,
	recoverWithPasscode,
	setProfile,
	signInWithGoogle,
} from './authentication';
import { notify, showSendModal } from './modal';
import { bootstrap, launchApp } from './splash';

export const appActions = {
	bootstrap,
	copy,
	launchApp,
	notify,
	setProfile,
	signInWithGoogle,
	confirmPasscode,
	recoverWithPasscode,
	setLoading: (flag: boolean): void => {
		appState.loading = flag;
	},
	showSendModal,
};

export { type AppState, appState } from '@walless/app';
