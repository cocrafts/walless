import { getAnalytics, logEvent } from '@firebase/analytics';
import {
	fetchAndActivate,
	getAll,
	getRemoteConfig,
} from '@firebase/remote-config';
import type { CustomWalletMetadata, RemoteConfig } from '@walless/core';
import { defaultRemoteConfig } from 'utils/constants';

import { app } from './index.ext';
import type { Analytics } from './types';

export const analytics = getAnalytics(app);
export const remoteConfig = getRemoteConfig(app);

/* update interval: 10 seconds for dev, and 1 hour for prod */
remoteConfig.settings.minimumFetchIntervalMillis = __DEV__ ? 10000 : 3600000;
remoteConfig.defaultConfig = defaultRemoteConfig as never;

export const loadRemoteConfig = async (): Promise<RemoteConfig> => {
	await fetchAndActivate(remoteConfig);
	const allConfig = getAll(remoteConfig);

	const customWalletsString = allConfig.customWallets?.asString();
	const customWallets = JSON.parse(customWalletsString) as Record<
		string,
		CustomWalletMetadata
	>;

	return {
		experimentalEnabled: allConfig.experimentalEnabled?.asBoolean(),
		deepAnalyticsEnabled: allConfig.deepAnalyticsEnabled?.asBoolean(),
		minimalVersion: allConfig.minimalVersion?.asString() || '1.0.0',
		customWallets: customWallets,
	};
};

export const appAnalytics: Analytics = {
	logEvent: async (name, params, options) => {
		return logEvent(analytics, name, params, options);
	},
	logScreenView: async (firebase_screen, firebase_screen_class) => {
		logEvent(analytics, 'screen_view', {
			firebase_screen,
			firebase_screen_class,
		});
	},
};

export type { FireCache } from './index.ext';
export {
	app,
	auth,
	fireCache,
	googleProvider,
	initializeAuth,
	performance,
} from './index.ext';
