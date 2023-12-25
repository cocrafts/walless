/* This module bridge between Browser Tab and Background Script,
 * should be super lightweight */

import { runtime } from '@walless/core';

import { injectServiceWorker, launchSignInTab } from './utils';

export const runBridge = async (): Promise<void> => {
	if (runtime.isExtension) {
		await launchSignInTab();
	} else {
		await injectServiceWorker();
	}
};

export * from './reply';
export * from './request';
