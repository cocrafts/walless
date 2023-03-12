import {
	confirmPasscode,
	recoverWithPasscode,
	setProfile,
	signInGoogle,
} from './authentication';
import { appState } from './internal';
import { bootstrap, launchApp } from './splash';

export const appActions = {
	bootstrap,
	launchApp,
	setProfile,
	signInGoogle,
	confirmPasscode,
	recoverWithPasscode,
	setLoading: (flag: boolean): void => {
		appState.loading = flag;
	},
};

export * from './internal';
