import type { BootstrapResult } from '@walless/auth';
import { appState, liveActions } from '@walless/engine';
import { modules } from '@walless/ioc';
import type { SettingDocument } from '@walless/store';
import { loadRemoteConfig } from 'utils/firebase';
import { resetRoute } from 'utils/navigation';

export const bootstrap = async (): Promise<BootstrapResult> => {
	appState.remoteConfig = loadRemoteConfig();
	await liveActions.initialize();
	await liveActions.watchAndSync();

	return appState;
};

export const launchApp = async ({
	profile,
}: BootstrapResult): Promise<void> => {
	const settingDoc = await modules.storage.safeGet<SettingDocument>('settings');
	const { mobileLastestLocation } = settingDoc?.config as never;
	if (profile?.email) {
		if (mobileLastestLocation) {
			resetRoute(undefined, undefined, mobileLastestLocation);
		} else {
			resetRoute('Dashboard');
		}
	} else {
		resetRoute('Invitation');
	}

	appState.loading = false;
};
