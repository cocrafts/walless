import { useEffect } from 'react';
import {
	checkNotifications,
	requestNotifications,
	RESULTS,
} from 'react-native-permissions';
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

		return () => {
			unsubscribeMessages();
		};
	}, []);
};

export const useNotificationPermissionRequest = () => {
	useEffect(() => {
		checkNotifications().then(({ status }) => {
			if (status !== RESULTS.GRANTED) {
				requestNotifications(['alert', 'badge', 'sound']);
			}
		});
	}, []);
};
