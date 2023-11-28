import { universalActions } from '@walless/app';
import { runtime } from '@walless/core';
import { appState } from '@walless/engine';
import type { DeviceInfoInput } from '@walless/graphql';
import { modules } from '@walless/ioc';
import type { SettingDocument } from '@walless/store';

import { app, auth } from './firebase';

export const getDeviceInfo = async (): Promise<DeviceInfoInput> => {
	const deviceId = await getDeviceId();

	return {
		deviceId,
		appVersion: '1.0.3',
		brand: navigator.vendor,
		deviceName: navigator.appName,
		systemVersion: navigator.appVersion,
		deviceType: runtime.isExtension ? 'Extension' : 'Web',
		manufacturer: navigator.userAgent,
		platform: navigator.platform,
	};
};

const getDeviceId = async (): Promise<string> => {
	const settings = await modules.storage.safeGet<SettingDocument>('settings');
	if (settings?.deviceId) return settings?.deviceId;

	const uniqueId = crypto.randomUUID();
	await modules.storage.upsert<SettingDocument>('settings', async (doc) => {
		doc.deviceId = uniqueId;
		doc.config = Object.assign({}, doc.config);
		return doc;
	});

	return uniqueId;
};

export const configureDeviceAndNotification = async (): Promise<void> => {
	await auth.authStateReady();
	const user = auth.currentUser;
	const deviceInfo = await getDeviceInfo();

	if (user?.uid) {
		if (appState.remoteConfig.deepAnalyticsEnabled) {
			universalActions.syncRemoteProfile();
		}
	}

	if (runtime.isExtension) {
		if (chrome.instanceID) {
			const nativeToken = await chrome.instanceID.getToken(nativeTokenArgs);
			deviceInfo.notificationToken = nativeToken;
		} else {
			console.log('Notification not available for this platform yet!');
		}
	} else {
		const { setUserProperties, getAnalytics } = await import(
			'firebase/analytics'
		);
		const { getMessaging, getToken } = await import('firebase/messaging');
		const messaging = getMessaging(app);

		deviceInfo.notificationToken = await getToken(messaging, webTokenArgs);

		if (user?.uid) {
			setUserProperties(getAnalytics(app), { email: user.email });
		}
	}

	universalActions.syncDeviceInfo(deviceInfo);
};

const webTokenArgs = {
	vapidKey: FIREBASE_VAPID_KEY,
};
const nativeTokenArgs = {
	authorizedEntity: FIREBASE_MESSAGING_SENDER_ID,
	scope: 'FCM',
};
