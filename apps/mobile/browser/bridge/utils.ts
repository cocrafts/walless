import { runtime } from '@walless/core';
import { modules } from '@walless/ioc';
import type { PureMessagePayload } from '@walless/messaging';
import { createMessenger } from '@walless/messaging';
import type { SettingDocument } from '@walless/store';

export interface PayloadOptions {
	sourceRequestId: string;
	isApproved?: boolean;
	passcode?: string;
}

export type PopupPayload = PureMessagePayload & PayloadOptions;

export const encryptedMessenger = createMessenger(modules.encryptionKeyVault);

export const launchSignInTab = async () => {
	if (!runtime.isExtension) return;
	const settings = await modules.storage.safeGet<SettingDocument>('settings');

	if (!settings?.profile?.email) {
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
	}
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
			console.log('Service worker registered:', reg);
			return reg;
		} catch (error) {
			console.error('Service worker registration failed:', error);
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
