import { registerServiceWorker } from 'utils/service-worker';

import { db } from './utils/alias';
import { registerMessageHandlers } from './listeners';

export const configureConditionalRuntime = async (): Promise<void> => {
	await registerMessageHandlers();

	if (global.chrome?.runtime) {
		await launchTabIfNotLoggedIn();
	} else {
		if (__DEV__) {
			require('../../scripts/kernel');
		} else {
			await registerServiceWorker('/kernel.js', { scope: '/' });
			await registerServiceWorker('/w3a-response.js', {
				scope: '/w3a-response/',
			});
		}
	}
};

const launchTabIfNotLoggedIn = async () => {
	const settings = await db.settings.get(1);

	if (!settings?.profile?.email) {
		chrome.tabs.query(
			{ url: `${chrome.runtime.getURL('index.html')}/*` },
			(tabs) => {
				if (tabs.length <= 0) {
					chrome.tabs.create({
						url: chrome.runtime.getURL('index.html'),
						active: true,
					});
				}
			},
		);
	}
};
