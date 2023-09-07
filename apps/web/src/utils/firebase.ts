import type { RemoteConfig } from '@walless/core';
import { defaultRemoteConfig } from '@walless/engine';
import type { FirebaseOptions } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
	activate,
	fetchConfig,
	getAll,
	getRemoteConfig,
} from 'firebase/remote-config';

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
export const remoteConfig = getRemoteConfig(app);
export const auth = getAuth();
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
	};
};

export interface FireCache {
	idToken?: string;
}

export const fireCache: FireCache = {
	idToken: undefined,
};

auth.onIdTokenChanged(async (user) => {
	if (user) {
		fireCache.idToken = await user.getIdToken();
	} else {
		fireCache.idToken = undefined;
	}
});

export const initializeAuth = async () => {
	if (auth.currentUser) {
		fireCache.idToken = await auth.currentUser.getIdToken();
	}
};
