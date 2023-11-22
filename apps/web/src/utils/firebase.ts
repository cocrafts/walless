import { universalActions } from '@walless/app';
import type { RemoteConfig } from '@walless/core';
import { runtime } from '@walless/core';
import { appState, defaultRemoteConfig } from '@walless/engine';
import type { UniversalAnalytics } from '@walless/ioc';
import { getAnalytics, logEvent, setUserProperties } from 'firebase/analytics';
import type { FirebaseOptions } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getMessaging, getToken } from 'firebase/messaging';
import {
	activate,
	fetchConfig,
	getAll,
	getRemoteConfig,
} from 'firebase/remote-config';

import { getDeviceInfo } from './device';

const firebaseOptions: FirebaseOptions = {
	apiKey: FIREBASE_API_KEY,
	authDomain: FIREBASE_AUTH_DOMAIN,
	projectId: FIREBASE_PROJECT_ID,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
	appId: FIREBASE_APP_ID,
	measurementId: FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseOptions);
export const auth = getAuth();
export const messaging = getMessaging(app);
export const remoteConfig = getRemoteConfig(app);
export const googleProvider = new GoogleAuthProvider();

/* update interval: 10 seconds for dev, and 1 hour for prod */
remoteConfig.settings.minimumFetchIntervalMillis = __DEV__ ? 10000 : 3600000;
remoteConfig.defaultConfig = defaultRemoteConfig as never;

export const loadRemoteConfig = (): RemoteConfig => {
	activate(remoteConfig);
	fetchConfig(remoteConfig); // fetch for next launch
	const allConfig = getAll(remoteConfig);

	return {
		experimentalEnabled: allConfig.experimentalEnabled?.asBoolean(),
		deepAnalyticsEnabled: allConfig.deepAnalyticsEnabled?.asBoolean(),
		minimalVersion: allConfig.minimalVersion?.asString() || '1.0.0',
	};
};

export interface FireCache {
	idToken?: string;
	notiToken?: string;
}

export const fireCache: FireCache = {
	idToken: undefined,
};

auth.onIdTokenChanged(async (user) => {
	if (user?.uid) {
		fireCache.idToken = await user.getIdToken();
	} else {
		fireCache.idToken = undefined;
	}
});

export const initializeAuth = async () => {
	await auth.authStateReady(); // wait until authentication ready
	const user = auth.currentUser;

	if (user?.uid) {
		fireCache.idToken = await user.getIdToken();

		if (!runtime.isExtension) {
			setUserProperties(getAnalytics(app), { email: user.email });
		}

		if (appState.remoteConfig.deepAnalyticsEnabled) {
			universalActions.syncRemoteProfile();
		}

		const deviceInfo = await getDeviceInfo();
		const nextToken = runtime.isExtension
			? await chrome.instanceID.getToken(nativeTokenArgs)
			: await getToken(messaging, webTokenArgs);

		universalActions.syncNotificationToken(nextToken, deviceInfo);
	}
};

export const universalAnalytics: UniversalAnalytics = {
	logEvent: (name, params, options) => {
		if (runtime.isExtension) return; // firebase/analytics not available in Extension runtime yet!
		return logEvent(getAnalytics(app), name, params, options);
	},
};

const webTokenArgs = {
	vapidKey: FIREBASE_VAPID_KEY,
};
const nativeTokenArgs = {
	authorizedEntity: FIREBASE_MESSAGING_SENDER_ID,
	scope: 'FCM',
};
