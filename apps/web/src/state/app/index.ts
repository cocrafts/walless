import { appState } from '@walless/app';

import {
	confirmPasscode,
	recoverWithPasscode,
	setProfile,
	signInWithGoogle,
} from './authentication';
import { bootstrap, launchApp } from './splash';

export const appActions = {
	bootstrap,
	launchApp,
	setProfile,
	signInWithGoogle,
	confirmPasscode,
	recoverWithPasscode,
	setLoading: (flag: boolean): void => {
		appState.loading = flag;
	},
};

export { type AppState, appState } from '@walless/app';
