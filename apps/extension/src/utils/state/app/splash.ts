import { UserProfile } from '@walless/storage';
import { db } from 'bridge/utils/alias';
import { hashRouter } from 'utils/router';

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
		await hashRouter.navigate('/');
	} else {
		await hashRouter.navigate('/login');
	}

	appState.loading = false;
};
