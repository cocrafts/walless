import type { UnknownObject } from '@walless/core';
import { logger, runtime } from '@walless/core';
import type { DeviceInfoInput } from '@walless/graphql';
import type { SystemDocument } from '@walless/store';
import { appState } from 'state/app';
import { runtimeActions } from 'state/runtime';
import { storage } from 'utils/storage';

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

export const configureDeviceAndNotification = async (): Promise<void> => {
	await auth().authStateReady();
	const user = auth().currentUser;
	const deviceInfo = await getDeviceInfo();

	if (user?.uid) {
		if (appState.remoteConfig.deepAnalyticsEnabled) {
			await runtimeActions.syncRemoteProfile();
		}
	}

	if ((global.chrome as UnknownObject).instanceID) {
		const nativeToken = await (chrome as UnknownObject).instanceID.getToken?.({
			authorizedEntity: FIREBASE_MESSAGING_SENDER_ID,
			scope: 'FCM',
		});
		deviceInfo.notificationToken = nativeToken;
	} else {
		logger.info('Notification not available for this platform yet!');
	}

	await runtimeActions.syncDeviceInfo(deviceInfo);
};

const getDeviceId = async (): Promise<string> => {
	const system = await storage.safeGet<SystemDocument>('system');
	if (system?.deviceId) return system?.deviceId;

	const uniqueId = crypto.randomUUID();
	await storage.upsert<SystemDocument>('system', async (doc) => {
		doc.deviceId = uniqueId;
		return doc;
	});

	return uniqueId;
};
