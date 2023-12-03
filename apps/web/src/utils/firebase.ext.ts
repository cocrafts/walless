import type { RemoteConfig } from '@walless/core';
import { appState, defaultRemoteConfig } from '@walless/engine';
import type { UniversalAnalytics } from '@walless/ioc';
import { getAnalytics, logEvent } from 'firebase/analytics';
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

export const loadRemoteConfig = async (): Promise<RemoteConfig> => {
	return defaultRemoteConfig;
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
		return logEvent(getAnalytics(app), name, params, options);
	},
};
