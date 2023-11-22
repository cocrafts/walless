import { useEffect } from 'react';
import {
	checkNotifications,
	requestNotifications,
	RESULTS,
} from 'react-native-permissions';
import { universalActions } from '@walless/app';
import { getDeviceInfo } from 'utils/device';
import { messaging } from 'utils/firebase';

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

		const unsubscribeTokenRefresh = messaging.onTokenRefresh(
			async (nextToken) => {
				const deviceInfo = await getDeviceInfo();
				universalActions.syncNotificationToken(nextToken, deviceInfo);
			},
		);

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
				const deviceInfo = await getDeviceInfo();
				const nextToken = await messaging.getToken();
				universalActions.syncNotificationToken(nextToken, deviceInfo);
			} catch (e) {
				console.log('Failed to get/sync Notification token from device');
			}
		});
	}, []);
};
