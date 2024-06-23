import type { Networks } from '@walless/core';
import { logger } from '@walless/core';
import type { PureMessagePayload } from '@walless/messaging';
import { createEncryptionKeyVault, createMessenger } from '@walless/messaging';
import { storage } from 'utils/storage/db';

export interface PayloadOptions {
	sourceRequestId: string;
	isApproved?: boolean;
	passcode?: string;
	network?: Networks;
}

export type PopupPayload = PureMessagePayload & PayloadOptions;

export const encryptionKeyVault = createEncryptionKeyVault(storage);
export const encryptedMessenger = createMessenger(encryptionKeyVault);

export const launchSignInTab = async () => {
	chrome.tabs.query({ url: `${chrome.runtime.getURL('/')}*` }, (tabs) => {
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
	});
};

export interface ServiceWorkerRegistrationOptions {
	scope?: string;
	updateViaCache?: ServiceWorkerUpdateViaCache;
}

export const registerServiceWorker = async (
	workerUrl: string,
	options?: ServiceWorkerRegistrationOptions,
): Promise<ServiceWorkerRegistration> => {
	if ('serviceWorker' in navigator) {
		try {
			const reg = await navigator.serviceWorker.register(workerUrl, options);
			logger.info('Service worker registered:', reg);
			return reg;
		} catch (error) {
			logger.error('Service worker registration failed:', error);
			throw error;
		}
	} else {
		return Promise.reject(
			new Error('Service workers are not supported in this browser'),
		);
	}
};

export const injectServiceWorker = async () => {
	if (__DEV__) {
		require('../kernel');
	} else {
		await registerServiceWorker('/kernel.js', { scope: '/' });
	}
};
