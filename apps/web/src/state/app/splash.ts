import { type BootstrapResult, appState } from '@walless/app';
import { PopupType } from '@walless/messaging';
import { initializeLiveState } from 'state/live';
import { loadRemoteConfig } from 'utils/firebase';
import { router } from 'utils/routing';

export const bootstrap = async (): Promise<BootstrapResult> => {
	await initializeLiveState();
	appState.remoteConfig = loadRemoteConfig();

	return appState;
};

export const launchApp = async ({
	profile,
	config,
}: BootstrapResult): Promise<void> => {
	const url = window.location.hash;
	const path = url.slice(1);
	const isSdkPopup =
		path.includes(PopupType.REQUEST_CONNECT_POPUP) ||
		path.includes(PopupType.SIGNATURE_POPUP);

	if (profile?.email) {
		if (isSdkPopup) {
			await router.navigate(path);
		} else {
			await router.navigate(config?.latestLocation ?? '/');
		}
	} else {
		await router.navigate('/invitation');
	}

	appState.loading = false;
};
