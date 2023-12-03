import { getAnalytics, logEvent } from '@firebase/analytics';
import {
	activate,
	fetchConfig,
	getAll,
	getRemoteConfig,
} from '@firebase/remote-config';
import type { RemoteConfig } from '@walless/core';
import { defaultRemoteConfig } from '@walless/engine';
import type { UniversalAnalytics } from '@walless/ioc';

import { app } from './firebase.ext';

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

export const universalAnalytics: UniversalAnalytics = {
	logEvent: async (name, params, options) => {
		return logEvent(getAnalytics(app), name, params, options);
	},
};

export type { FireCache } from './firebase.ext';
export {
	app,
	auth,
	fireCache,
	googleProvider,
	initializeAuth,
} from './firebase.ext';
