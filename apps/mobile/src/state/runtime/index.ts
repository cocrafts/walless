import { setPathname, setPrivacy, syncDeviceInfo } from './config';
import { runtimeState } from './internal';
import { syncRemoteProfile } from './profile';

export const runtimeActions = {
	setPrivacy,
	setPathname,
	syncDeviceInfo,
	syncRemoteProfile,
	toggleDrawer: (flag?: boolean) => {
		if (flag === undefined) {
			runtimeState.isDrawerOpen = !runtimeState.isDrawerOpen;
		} else {
			runtimeState.isDrawerOpen = flag;
		}
	},
};

export * from './internal';
