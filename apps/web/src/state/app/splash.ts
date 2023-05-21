import { type BootstrapResult, appState } from '@walless/app';
import { modules } from '@walless/ioc';
import { type SettingDocument } from '@walless/store';
import { router } from 'utils/routing';

export const bootstrap = async (): Promise<BootstrapResult> => {
	const response: BootstrapResult = {};
	const setting = await modules.storage.safeGet<SettingDocument>('settings');

	if (setting?.profile?.email) {
		response.profile = setting.profile;
		appState.profile = setting.profile;
	}

	return response;
};

export const launchApp = async ({
	profile,
}: BootstrapResult): Promise<void> => {
	if (profile?.email) {
		await router.navigate('/');
	} else {
		await router.navigate('/invitation');
	}

	appState.loading = false;
};
