import type { BootstrapResult } from '@walless/auth';
import { appState, liveActions } from '@walless/engine';
import { modules } from '@walless/ioc';
import type { SettingDocument } from '@walless/store';
import { loadRemoteConfig } from 'utils/firebase';

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
	appState.profileReady = !!profile?.id && !!settingDoc?.profile.id;
	appState.profileLoading = false;
};
