import { appState } from '@walless/engine';

import { setPathname, setPrivacy } from './settings';

export const appActions = {
	setLoading: (flag: boolean): void => {
		appState.loading = flag;
	},
	setPrivacy,
	setPathname,
};

export { type AppState, appState } from '@walless/engine';
