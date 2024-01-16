import type { EncryptionKeyVault } from '@walless/messaging';
import type { Database } from '@walless/store';
import type { GraphQLClient } from 'graphql-request';

import type { UniversalAnalytics } from './analytics';
import type { UniversalAsset } from './asset';
import type { NativeConfig } from './config';
import type { NativeModules } from './native';

export interface DynamicModules {
	native: NativeModules;
	analytics: UniversalAnalytics;
	asset: UniversalAsset;
	config: NativeConfig;
	storage: Database;
	qlClient: GraphQLClient;
	encryptionKeyVault: EncryptionKeyVault;
	thresholdKey?: never;
}

export const modules: DynamicModules = {} as never;
export * from './analytics';
export * from './asset';
export * from './config';
export * from './native';
export * from './utils';
