import { type BootstrapResult, appState } from '@walless/app';
import { initializeLiveState } from 'state/live';
import { router } from 'utils/routing';

export const bootstrap = async (): Promise<BootstrapResult> => {
	await initializeLiveState();

	return appState;
};

export const launchApp = async ({
	profile,
	config,
}: BootstrapResult): Promise<void> => {
	if (profile?.email) {
		await router.navigate(config?.latestLocation ?? '/');
	} else {
		await router.navigate('/invitation');
	}

	appState.loading = false;
};
