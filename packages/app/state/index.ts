import { appState } from '@walless/engine';

import { syncRemoteProfile } from './profile';
import { setPathname, setPrivacy, syncDeviceInfo } from './settings';
import { toggleDrawer } from './univeral';

export const universalActions = {
	setLoading: (flag: boolean): void => {
		appState.loading = flag;
	},
	setPrivacy,
	setPathname,
	toggleDrawer,
	syncRemoteProfile,
	syncDeviceInfo,
};

export * from './float';
export * from './transaction';
export { universalSate } from './univeral';
