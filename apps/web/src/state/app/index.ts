import { appState } from '@walless/app';

import {
	confirmPasscode,
	recoverWithPasscode,
	setProfile,
	signInWithGoogle,
} from './authentication';
import { notify } from './modal';
import { bootstrap, launchApp } from './splash';

export const appActions = {
	bootstrap,
	launchApp,
	notify,
	setProfile,
	signInWithGoogle,
	confirmPasscode,
	recoverWithPasscode,
	setLoading: (flag: boolean): void => {
		appState.loading = flag;
	},
};

export { type AppState, appState } from '@walless/app';
