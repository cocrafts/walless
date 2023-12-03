import { universalActions } from '@walless/app';
import { appState } from '@walless/engine';
import { getAnalytics, setUserProperties } from 'firebase/analytics';
import { getMessaging, getToken } from 'firebase/messaging';

import { getDeviceInfo } from './device.ext';
import { app, auth } from './firebase';

export const configureDeviceAndNotification = async (): Promise<void> => {
	await auth.authStateReady();
	const user = auth.currentUser;
	const deviceInfo = await getDeviceInfo();

	if (user?.uid) {
		if (appState.remoteConfig.deepAnalyticsEnabled) {
			universalActions.syncRemoteProfile();
		}
	}

	try {
		const messaging = getMessaging(app);
		deviceInfo.notificationToken = await getToken(messaging, {
			vapidKey: FIREBASE_VAPID_KEY,
		});
	} catch (e) {
		console.log('Could not register/get Notification Token from device.');
	}

	if (user?.uid) {
		setUserProperties(getAnalytics(app), { email: user.email });
	}

	universalActions.syncDeviceInfo(deviceInfo);
};

export { getDeviceInfo } from './device.ext';
