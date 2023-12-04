import { appState } from '@walless/engine';

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

export * from './local';
