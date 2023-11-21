import { appState } from '@walless/engine';
import { devtools } from 'valtio/utils';

import { signInWithGoogle } from './authentication';
import { bootstrap, launchApp } from './splash';

devtools(appState, { name: 'App', enabled: __DEV__ });

export const appActions = {
	bootstrap,
	launchApp,
	signInWithGoogle,
};
