import type { BootstrapResult } from '@walless/app';
import { liveActions } from '@walless/app';
import { appState } from '@walless/app';
import { modules } from '@walless/ioc';
import type { SettingDocument } from '@walless/store';
import { loadRemoteConfig } from 'utils/firebase';
import { navigate } from 'utils/navigation';

export const bootstrap = async (): Promise<BootstrapResult> => {
	appState.remoteConfig = loadRemoteConfig();
	await liveActions.initialize();
	await liveActions.watchAndSync();

	return appState;
};

export const launchApp = async ({
	profile,
	config,
}: BootstrapResult): Promise<void> => {
	if (profile?.email) {
		navigate('Dashboard');
	} else {
		navigate('Invitation');
	}

	appState.loading = false;
};
