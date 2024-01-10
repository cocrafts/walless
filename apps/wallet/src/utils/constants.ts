import type { Config, RemoteConfig } from '@walless/core';

export const noHeaderNavigation = {
	headerShown: false,
};

export const tabBarHeight = 52;

export const solMint = '11111111111111111111111111111111';
export const METADATA_PROGRAM_ID =
	'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';

export const defaultConfig: Config = {
	hideBalance: true,
	latestLocation: '/',
};

export const defaultRemoteConfig: RemoteConfig = {
	experimentalEnabled: true,
	deepAnalyticsEnabled: true,
	minimalVersion: '1.0.0',
};
