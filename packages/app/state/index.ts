import { appState } from '@walless/engine';

import { syncRemoteProfile } from './profile';
import { setPathname, setPrivacy } from './settings';

export const universalActions = {
	setLoading: (flag: boolean): void => {
		appState.loading = flag;
	},
	setPrivacy,
	setPathname,
	syncRemoteProfile,
};
