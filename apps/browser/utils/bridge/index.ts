import { runtime } from '@walless/core';
import { db } from 'utils/storage';

export const runBridge = async () => {
	if (runtime.isExtension) {
		await launchTabIfNotLoggedIn();
	} else {
		require('../../scripts/kernel');
	}
};

const launchTabIfNotLoggedIn = async () => {
	const settings = await db.settings.get(1);

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
