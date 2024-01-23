import { getAnalytics, setUserProperties } from '@firebase/analytics';
import {
	getMessaging,
	getToken,
	isSupported as isMessagingSupported,
} from '@firebase/messaging';
import { logger } from '@walless/core';
import { appState } from 'state/app';
import { runtimeActions } from 'state/runtime';

import { app, auth } from '../firebase/index.web';

import { getDeviceInfo } from './device.ext';

export const configureDeviceAndNotification = async (): Promise<void> => {
	await auth().authStateReady();
	const user = auth().currentUser;
	const deviceInfo = await getDeviceInfo();

	if (user?.uid) {
		if (appState.remoteConfig.deepAnalyticsEnabled) {
			runtimeActions.syncRemoteProfile();
		}
	}

	if (await isMessagingSupported()) {
		try {
			const messaging = getMessaging(app);
			deviceInfo.notificationToken = await getToken(messaging, {
				vapidKey: FIREBASE_VAPID_KEY,
			});
		} catch (e) {
			logger.error('Could not register/get Notification Token from device.');
		}
	}

	if (user?.uid) {
		setUserProperties(getAnalytics(app), { email: user.email });
	}

	runtimeActions.syncDeviceInfo(deviceInfo);
};

export { getDeviceInfo } from './device.ext';
