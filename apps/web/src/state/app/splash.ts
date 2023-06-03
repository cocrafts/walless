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
		if (config?.currentScreen) {
			await router.navigate(config.currentScreen);
		} else {
			await router.navigate('/');
		}
	} else {
		await router.navigate('/invitation');
	}

	appState.loading = false;
};
