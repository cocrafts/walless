import type { RemoteConfig } from '@walless/core';
import { appState, defaultRemoteConfig } from '@walless/engine';
import type { UniversalAnalytics } from '@walless/ioc';
import { getAnalytics, logEvent } from 'firebase/analytics';
import {
	activate,
	fetchConfig,
	getAll,
	getRemoteConfig,
} from 'firebase/remote-config';

import { app, auth, fireCache } from './firebase.ext';

const analytics = getAnalytics(app);
const remoteConfig = getRemoteConfig(app);

/* update interval: 10 seconds for dev, and 1 hour for prod */
remoteConfig.settings.minimumFetchIntervalMillis = __DEV__ ? 10000 : 3600000;
remoteConfig.defaultConfig = defaultRemoteConfig as never;

export const loadRemoteConfig = async (): Promise<RemoteConfig> => {
	activate(remoteConfig);
	fetchConfig(remoteConfig);
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
		return logEvent(analytics, name, params, options);
	},
};

export { app, auth, fireCache, googleProvider } from './firebase.ext';
