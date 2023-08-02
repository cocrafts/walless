import { appState } from '@walless/app';

import {
	initLocalDeviceByPasscodeAndSync,
	signInWithGoogle,
} from './authentication';
import { notify, showSendModal } from './modal';
import { setPathname, setPrivacy } from './settings';
import { bootstrap, launchApp } from './splash';
import { copy } from './system';

export const appActions = {
	bootstrap,
	copy,
	launchApp,
	notify,
	signInWithGoogle,
	initLocalDeviceByPasscodeAndSync: initLocalDeviceByPasscodeAndSync,
	setLoading: (flag: boolean): void => {
		appState.loading = flag;
	},
	showSendModal,
	setPrivacy,
	setPathname,
};

export { type AppState, appState } from '@walless/app';
