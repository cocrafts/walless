import getAnalytics, {
	logEvent,
	logScreenView,
	setUserProperties,
} from '@react-native-firebase/analytics';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import authModule from '@react-native-firebase/auth';
import getCrashlytics from '@react-native-firebase/crashlytics';
import remoteConfig from '@react-native-firebase/remote-config';
import type { RemoteConfig } from '@walless/core';
import { appState } from 'state/app';
import { runtimeActions } from 'state/runtime';
import { defaultRemoteConfig } from 'utils/constants';

import type { Analytics } from './types';

export const auth = authModule;
export type FirebaseUser = FirebaseAuthTypes.User;

export const analytics = getAnalytics();
export const crashlytics = getCrashlytics();

const minimumFetchIntervalMillis = __DEV__
	? 10000 // 10 seconds for development
	: 3600000; // 1 hour for prod
remoteConfig().setDefaults(defaultRemoteConfig as never);
remoteConfig().setConfigSettings({ minimumFetchIntervalMillis });

export const loadRemoteConfig = (): RemoteConfig => {
	remoteConfig().activate();
	remoteConfig().fetch(); // fetch for next launch
	const allConfig = remoteConfig().getAll();

	return {
		experimentalEnabled: allConfig.experimentalEnabled?.asBoolean(),
		deepAnalyticsEnabled: allConfig.deepAnalyticsEnabled?.asBoolean(),
		minimalVersion: allConfig.minimalVersion?.asString() || '1.0.0',
	};
};

export interface FireCache {
	idToken?: string;
}

export const fireCache: FireCache = {
	idToken: undefined,
};

auth().onIdTokenChanged(async (user) => {
	if (user) {
		fireCache.idToken = await user.getIdToken();
		appState.jwtAuth = fireCache.idToken;
	} else {
		fireCache.idToken = undefined;
	}
});

export const initializeAuth = async () => {
	const user = auth().currentUser;

	if (user) {
		const attributes = {
			email: user.email as string,
			username: user.displayName as string,
		};

		fireCache.idToken = await user.getIdToken();
		setUserProperties(analytics, { email: user.email });
		crashlytics.setUserId(user.uid);
		crashlytics.setAttributes(attributes);

		if (appState.remoteConfig.deepAnalyticsEnabled) {
			runtimeActions.syncRemoteProfile();
		}
	}
};

export const appAnalytics: Analytics = {
	logEvent: (name, params, options) => {
		return logEvent(analytics, name, params, options);
	},
	logScreenView: (screen_name, screen_class, others = {}) => {
		return logScreenView(analytics, { screen_name, screen_class, ...others });
	},
};
