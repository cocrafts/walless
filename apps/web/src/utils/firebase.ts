import type { RemoteConfig } from '@walless/core';
import { runtime } from '@walless/core';
import { appState, defaultRemoteConfig } from '@walless/engine';
import type { UniversalAnalytics } from '@walless/ioc';
import type { FirebaseOptions } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

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
export const googleProvider = new GoogleAuthProvider();

if (!runtime.isExtension) {
	import('firebase/remote-config').then(({ getRemoteConfig }) => {
		const remoteConfig = getRemoteConfig(app);
		/* update interval: 10 seconds for dev, and 1 hour for prod */
		remoteConfig.settings.minimumFetchIntervalMillis = __DEV__
			? 10000
			: 3600000;
		remoteConfig.defaultConfig = defaultRemoteConfig as never;
	});
}

export const loadRemoteConfig = async (): Promise<RemoteConfig> => {
	if (runtime.isExtension) {
		return {
			experimentalEnabled: true,
			deepAnalyticsEnabled: true,
			minimalVersion: '99.99.99',
		};
	} else {
		const remote = await import('firebase/remote-config');
		const remoteConfig = remote.getRemoteConfig(app);
		remote.activate(remoteConfig);
		remote.fetchConfig(remoteConfig);
		const allConfig = remote.getAll(remoteConfig);

		return {
			experimentalEnabled: allConfig.experimentalEnabled?.asBoolean(),
			deepAnalyticsEnabled: allConfig.deepAnalyticsEnabled?.asBoolean(),
			minimalVersion: allConfig.minimalVersion?.asString() || '1.0.0',
		};
	}
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
		appState.jwtAuth = fireCache.idToken;
	} else {
		fireCache.idToken = undefined;
	}
});

export const initializeAuth = async () => {
	await auth.authStateReady(); // wait until authentication ready
	const user = auth.currentUser;

	if (user?.uid) {
		fireCache.idToken = await user.getIdToken();
	}
};

export const universalAnalytics: UniversalAnalytics = {
	logEvent: async (name, params, options) => {
		if (runtime.isExtension) return; // firebase/analytics not available in Extension runtime yet!
		const { getAnalytics, logEvent } = await import('firebase/analytics');
		return logEvent(getAnalytics(app), name, params, options);
	},
};
