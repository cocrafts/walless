import type { Config, RemoteConfig } from '@walless/core';

export const noHeaderNavigation = {
	headerShown: false,
};

export const tabBarHeight = 52;

export const defaultConfig: Omit<Config, 'version'> = {
	hideBalance: true,
	latestLocation: '/',
};

export const defaultRemoteConfig: RemoteConfig = {
	experimentalEnabled: true,
	deepAnalyticsEnabled: true,
	minimalVersion: '1.0.0',
};

/**
 * Solana only
 */
export const solMint = '11111111111111111111111111111111';
export const wrappedSolMint = 'So11111111111111111111111111111111111111112';
export const METADATA_PROGRAM_ID =
	'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';

/**
 * Sui only
 */
export const SUI_COIN_TYPE = '0x2::sui::SUI';
