import { appState } from '@walless/app';

import { signInWithGoogle } from './authentication';
import { bootstrap, launchApp } from './splash';

export const appActions = {
	bootstrap,
	launchApp,
	signInWithGoogle,
	setLoading: (flag: boolean): void => {
		appState.loading = flag;
	},
};

export { type AppState, appState } from '@walless/app';
