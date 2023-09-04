import { appState } from '@walless/engine';

import { signInWithGoogle, signInWithPasscode } from './authentication';
import { bootstrap, launchApp } from './splash';

export const appActions = {
	bootstrap,
	launchApp,
	signInWithGoogle,
	signInWithPasscode,
	setLoading: (flag: boolean): void => {
		appState.loading = flag;
	},
};

export { type AppState, appState } from '@walless/engine';
