import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import { defaultConfig } from '@walless/app';
import type { RemoteConfig } from '@walless/core';

const minimumFetchIntervalMillis = __DEV__
	? 10000 // 10 seconds for development
	: 3600000; // 1 hour for prod
remoteConfig().setDefaults(defaultConfig as never);
remoteConfig().setConfigSettings({ minimumFetchIntervalMillis });

export const loadRemoteConfig = (): RemoteConfig => {
	remoteConfig().activate();
	remoteConfig().fetch(); // fetch for next launch
	const allConfig = remoteConfig().getAll();

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

auth().onIdTokenChanged(async (user) => {
	if (user) {
		fireCache.idToken = await user.getIdToken();
	} else {
		fireCache.idToken = undefined;
	}
});

export const initializeAuth = async () => {
	if (auth().currentUser) {
		fireCache.idToken = await auth().currentUser?.getIdToken();
	}
};
