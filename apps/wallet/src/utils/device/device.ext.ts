import { logger, runtime } from '@walless/core';
import { appState } from '@walless/engine';
import type { DeviceInfoInput } from '@walless/graphql';
import { modules } from '@walless/ioc';
import type { SystemDocument } from '@walless/store';
import { runtimeActions } from 'state/runtime';

import project from '../../../package.json';
import { auth } from '../firebase/index.ext';

export const getDeviceInfo = async (): Promise<DeviceInfoInput> => {
	const deviceId = await getDeviceId();

	return {
		deviceId,
		appVersion: project.version,
		brand: navigator.vendor,
		deviceName: navigator.appName,
		systemVersion: navigator.appVersion,
		deviceType: runtime.isExtension ? 'Extension' : 'Web',
		manufacturer: navigator.userAgent,
		platform: navigator.platform,
	};
};

const getDeviceId = async (): Promise<string> => {
	const system = await modules.storage.safeGet<SystemDocument>('system');
	if (system?.deviceId) return system?.deviceId;

	const uniqueId = crypto.randomUUID();
	await modules.storage.upsert<SystemDocument>('system', async (doc) => {
		doc.deviceId = uniqueId;
		return doc;
	});

	return uniqueId;
};

export const configureDeviceAndNotification = async (): Promise<void> => {
	await auth().authStateReady();
	const user = auth().currentUser;
	const deviceInfo = await getDeviceInfo();

	if (user?.uid) {
		if (appState.remoteConfig.deepAnalyticsEnabled) {
			runtimeActions.syncRemoteProfile();
		}
	}

	if (global.chrome?.instanceID) {
		const nativeToken = await chrome.instanceID.getToken?.({
			authorizedEntity: FIREBASE_MESSAGING_SENDER_ID,
			scope: 'FCM',
		});
		deviceInfo.notificationToken = nativeToken;
	} else {
		logger.info('Notification not available for this platform yet!');
	}

	runtimeActions.syncDeviceInfo(deviceInfo);
};
