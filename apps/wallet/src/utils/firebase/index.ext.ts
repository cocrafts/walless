import type { FirebaseOptions } from '@firebase/app';
import { initializeApp } from '@firebase/app';
import type { User } from '@firebase/auth';
import { getAuth, GoogleAuthProvider } from '@firebase/auth';
import { getPerformance } from '@firebase/performance';
import type { RemoteConfig } from '@walless/core';
import { appState } from 'state/app';
import { runtimeActions } from 'state/runtime';
import { defaultRemoteConfig } from 'utils/constants';

import type { Analytics } from './types';

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
export const auth = () => getAuth(app);
export type FirebaseUser = User;

export const performance = getPerformance(app);
export const googleProvider = new GoogleAuthProvider();

export const loadRemoteConfig = (): RemoteConfig => {
	return defaultRemoteConfig;
};

export interface FireCache {
	idToken?: string;
	notiToken?: string;
}

export const fireCache: FireCache = {
	idToken: undefined,
};

auth().onIdTokenChanged(async (user) => {
	if (user?.uid) {
		fireCache.idToken = await user.getIdToken();
		appState.jwtAuth = fireCache.idToken;
	} else {
		fireCache.idToken = undefined;
	}
});

export const initializeAuth = async () => {
	await auth().authStateReady(); // wait until authentication ready
	const user = auth().currentUser;

	if (user?.uid) {
		fireCache.idToken = await user.getIdToken();

		if (appState.remoteConfig.deepAnalyticsEnabled) {
			runtimeActions.syncRemoteProfile();
		}
	}
};

export const appAnalytics: Analytics = {
	logEvent: async () => {},
	logScreenView: async () => {},
};
