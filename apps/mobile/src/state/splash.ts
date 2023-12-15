import type { BootstrapResult } from '@walless/auth';
import { appState, liveActions } from '@walless/engine';
import { modules } from '@walless/ioc';
import type { SettingDocument } from '@walless/store';
import { loadRemoteConfig } from 'utils/firebase';
import { navigationRef } from 'utils/navigation';

export const bootstrap = async (): Promise<BootstrapResult> => {
	appState.remoteConfig = loadRemoteConfig();
	await liveActions.initialize();
	await liveActions.watchAndSync();

	return appState;
};

export const launchApp = async (): Promise<void> => {
	const settings = await modules.storage.safeGet<SettingDocument>('settings');
	const widgetId = settings?.config?.latestLocation as string;

	if (widgetId) {
		navigationRef.navigate('Dashboard', {
			screen: 'Explore',
			params: {
				screen: 'Widget',
				params: { id: widgetId },
			},
		});
	}
};
