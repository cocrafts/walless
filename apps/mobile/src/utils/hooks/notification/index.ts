import { useEffect } from 'react';
import {
	checkNotifications,
	requestNotifications,
	RESULTS,
} from 'react-native-permissions';
import getMessaging from '@react-native-firebase/messaging';
import { universalActions } from '@walless/app';
import { logger } from '@walless/core';
import { getDeviceInfo } from 'utils/device';

const syncDeviceAndNotification = async (nextToken?: string) => {
	const deviceInfo = await getDeviceInfo();
	deviceInfo.notificationToken = nextToken;
	universalActions.syncDeviceInfo(deviceInfo);
};

export const useNotifications = () => {
	useEffect(() => {
		const messaging = getMessaging();

		messaging.onNotificationOpenedApp((message) => {
			logger.debug('App to opened from BG:', message.notification);
		});

		messaging.getInitialNotification().then((message) => {
			if (message) {
				logger.debug('App resumed from quit', message.notification);
			}
		});

		const unsubscribeMessages = messaging.onMessage(async (message) => {
			logger.debug(message);
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
				syncDeviceAndNotification(await getMessaging().getToken());
			} catch (e) {
				logger.error('Failed to get/sync Notification token from device');
			}
		});
	}, []);
};
