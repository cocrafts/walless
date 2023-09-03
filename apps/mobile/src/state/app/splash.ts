import type { BootstrapResult } from '@walless/auth';
import { appState, liveActions } from '@walless/engine';
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
}: BootstrapResult): Promise<void> => {
	if (profile?.email) {
		navigate('Dashboard');
	} else {
		navigate('Invitation');
	}

	appState.loading = false;
};
