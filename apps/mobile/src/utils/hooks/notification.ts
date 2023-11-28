import { useEffect } from 'react';
import {
	checkNotifications,
	requestNotifications,
	RESULTS,
} from 'react-native-permissions';
import { universalActions } from '@walless/app';
import { getDeviceInfo } from 'utils/device';
import { messaging } from 'utils/firebase';

const syncDeviceAndNotification = async (nextToken?: string) => {
	const deviceInfo = await getDeviceInfo();
	deviceInfo.notificationToken = nextToken;
	universalActions.syncDeviceInfo(deviceInfo);
};

export const useNotifications = () => {
	useEffect(() => {
		messaging.onNotificationOpenedApp((message) => {
			console.log('App to opened from BG:', message.notification);
		});

		messaging.getInitialNotification().then((message) => {
			if (message) {
				console.log('App resumed from quit', message.notification);
			}
		});

		const unsubscribeMessages = messaging.onMessage(async (message) => {
			console.log(message);
		});

		const unsubscribeTokenRefresh = messaging.onTokenRefresh((nextToken) => {
			syncDeviceAndNotification(nextToken);
		});

		checkNotifications().then(async ({ status }) => {
			if (status === RESULTS.GRANTED) {
				syncDeviceAndNotification(await messaging.getToken());
			} else {
				syncDeviceAndNotification();
			}
		});

		return () => {
			unsubscribeMessages();
			unsubscribeTokenRefresh();
		};
	}, []);
};

export const useNotificationPermissionRequest = () => {
	useEffect(() => {
		checkNotifications().then(async ({ status }) => {
			if (status !== RESULTS.GRANTED) {
				await requestNotifications(['alert', 'badge', 'sound']);
			}

			try {
				syncDeviceAndNotification(await messaging.getToken());
			} catch (e) {
				console.log('Failed to get/sync Notification token from device');
			}
		});
	}, []);
};
