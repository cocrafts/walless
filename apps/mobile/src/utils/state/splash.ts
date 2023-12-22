import type { BootstrapResult } from '@walless/auth';
import type { MobileNavigation } from '@walless/core';
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
	const latestLocation = settingDoc?.config?.latestLocation;

	const isDeprecated = typeof latestLocation == 'string';
	if (profile?.email) {
		if (latestLocation && !isDeprecated) {
			if (latestLocation.name == 'Authentication') {
				resetRoute('Invitation');
			} else {
				resetRoute(undefined, undefined, latestLocation);
			}
		} else {
			resetRoute('Dashboard');
		}
	} else {
		resetRoute('Invitation');
	}

	appState.loading = false;
};
