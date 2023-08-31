import type { BootstrapResult } from '@walless/app';
import { appState } from '@walless/app';
import { modules } from '@walless/ioc';
import type { SettingDocument } from '@walless/store';

import { navigate } from '../../utils/navigation';

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
		navigate('Dashboard');
	} else {
		navigate('Login');
	}

	appState.loading = false;
};
