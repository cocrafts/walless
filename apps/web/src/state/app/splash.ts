import { type UserProfile } from '@walless/core';
import { router } from 'utils/routing';
import { db } from 'utils/storage';

import { appState } from './internal';

export interface BootstrapResult {
	profile?: UserProfile;
}

export const bootstrap = async (): Promise<BootstrapResult> => {
	const response: BootstrapResult = {};
	const setting = await db.settings.get(1);

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
		await router.navigate('/login');
	}

	appState.loading = false;
};
