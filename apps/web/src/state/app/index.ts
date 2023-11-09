import { signInWithGoogle } from './authentication';
import { bootstrap, launchApp } from './splash';

export const appActions = {
	bootstrap,
	launchApp,
	signInWithGoogle,
};

export { type AppState, appState } from '@walless/engine';
