import { appState } from '@walless/engine';

import { signInWithGoogle } from './authentication';
import { notify } from './modal';
import { setPathname, setPrivacy } from './settings';
import { bootstrap, launchApp } from './splash';

export const appActions = {
	bootstrap,
	launchApp,
	notify,
	signInWithGoogle,
	setLoading: (flag: boolean): void => {
		appState.loading = flag;
	},
	setPrivacy,
	setPathname,
};

export { type AppState, appState } from '@walless/engine';
