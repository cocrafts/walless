import { type BootstrapResult, appState } from '@walless/app';
import { initializeLiveState } from 'state/live';
import { router } from 'utils/routing';

export const bootstrap = async (): Promise<BootstrapResult> => {
	await initializeLiveState();

	return appState;
};

export const launchApp = async ({
	profile,
}: BootstrapResult): Promise<void> => {
	const url = window.location.hash;
	const path = url.slice(1);

	if (path) {
		await router.navigate(path);
	} else if (profile?.email) {
		await router.navigate('/');
	} else {
		await router.navigate('/invitation');
	}

	appState.loading = false;
};
