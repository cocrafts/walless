import {
	confirmPasscode,
	recoverWithPasscode,
	setProfile,
	signInGoogle,
} from './authentication';
import { appState } from './internal';
import { notify } from './modal';
import { bootstrap, launchApp } from './splash';

export const appActions = {
	bootstrap,
	launchApp,
	notify,
	setProfile,
	signInGoogle,
	confirmPasscode,
	recoverWithPasscode,
	setLoading: (flag: boolean): void => {
		appState.loading = flag;
	},
};

export * from './internal';
