import { appState } from '@walless/engine';

import { syncRemoteProfile } from './profile';
import { setPathname, setPrivacy, syncDeviceInfo } from './settings';

export const universalActions = {
	setLoading: (flag: boolean): void => {
		appState.loading = flag;
	},
	setPrivacy,
	setPathname,
	syncRemoteProfile,
	syncDeviceInfo,
};

export * from './float';
export * from './transaction';
