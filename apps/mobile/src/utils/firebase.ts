import getAnalytics, {
	logEvent,
	setUserProperties,
} from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import getCrashlytics from '@react-native-firebase/crashlytics';
import getMessaging from '@react-native-firebase/messaging';
import remoteConfig from '@react-native-firebase/remote-config';
import { universalActions } from '@walless/app';
import type { RemoteConfig } from '@walless/core';
import { appState, defaultRemoteConfig } from '@walless/engine';
import type { UniversalAnalytics } from '@walless/ioc';

export const analytics = getAnalytics();
export const crashlytics = getCrashlytics();
export const messaging = getMessaging();

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
			universalActions.syncRemoteProfile();
		}
	}
};

export const universalAnalytics: UniversalAnalytics = {
	logEvent: (name, params, options) => {
		return logEvent(analytics, name, params, options);
	},
};
