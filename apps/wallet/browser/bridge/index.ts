/* This module bridge between Browser Tab and Background Script,
 * should be super lightweight */

import { runtime } from '@walless/core';
import type { SettingDocument } from '@walless/store';

import { injectServiceWorker, launchSignInTab, storage } from './utils';

export const runBridge = async (): Promise<void> => {
	if (runtime.isExtension) {
		const settings = await storage.safeGet<SettingDocument>('settings');
		if (!settings?.profile?.email) await launchSignInTab();
	} else {
		await injectServiceWorker();
	}
};

export * from './reply';
export * from './request';
