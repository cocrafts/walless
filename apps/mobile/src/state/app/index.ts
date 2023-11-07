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
	setActiveWidget: (id: string): void => {
		appState.activeWidgetId = id;
	},
	setIsDrawerOpen: (flag: boolean): void => {
		appState.isDrawerOpen = flag;
	},
};

export { type AppState, appState } from '@walless/engine';
