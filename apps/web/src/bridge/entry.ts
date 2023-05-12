import { runtime } from '@walless/core';
import { SettingDocument } from '@walless/store';
import modules from 'utils/modules';
import { registerServiceWorker } from 'utils/service-worker';

import { registerMessageHandlers } from './listeners';

export const injectRuntime = async (): Promise<void> => {
	await registerMessageHandlers();

	if (runtime.isExtension) {
		await launchTabIfNotLoggedIn();
	} else {
		if (__DEV__) {
			require('../../scripts/kernel');
		} else {
			await registerServiceWorker('/kernel.js', { scope: '/' });
		}
	}
};

const launchTabIfNotLoggedIn = async () => {
	const settings = await modules.storage.safeGet<SettingDocument>('settings');

	if (!settings?.profile?.email) {
		chrome.tabs.query(
			{ url: `${chrome.runtime.getURL('index.html')}*` },
			(tabs) => {
				if (tabs.length <= 0) {
					chrome.tabs.create({
						url: chrome.runtime.getURL('index.html'),
						active: true,
					});

					/* close extension popup */
					chrome.extension.getViews({ type: 'popup' }).forEach((view) => {
						view.close();
					});
				}
			},
		);
	}
};
