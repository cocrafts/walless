import type { BootstrapResult } from '@walless/auth';
import { appState, liveActions } from '@walless/engine';
import { loadRemoteConfig } from 'utils/firebase';
import { router } from 'utils/routing';

export const bootstrap = async (): Promise<BootstrapResult> => {
	appState.remoteConfig = await loadRemoteConfig();
	await liveActions.initialize();
	await liveActions.watchAndSync();

	return appState;
};

export const launchApp = async ({
	profile,
	config,
}: BootstrapResult): Promise<void> => {
	const url = window.location.hash;
	const isSdkPopup = url.includes('popup');
	const path = url.slice(1).replace('/popup', '');

	if (profile?.email) {
		if (isSdkPopup) {
			await router.navigate(path, { replace: true });
		} else {
			await router.navigate((config?.latestLocation as string) ?? '/', {
				replace: true,
			});
		}
	} else {
		await router.navigate('/invitation', { replace: true });
	}

	appState.loading = false;
};
