import type { Engine } from '@walless/engine';
import type { EncryptionKeyVault } from '@walless/messaging';
import type { Database } from '@walless/store';
import type { GraphQLClient } from 'graphql-request';

import type { UniversalAnalytics } from './analytics';
import type { UniversalAsset } from './asset';
import type { NativeConfig } from './config';

export interface DynamicModules {
	analytics: UniversalAnalytics;
	asset: UniversalAsset;
	config: NativeConfig;
	engine: Engine;
	storage: Database;
	qlClient: GraphQLClient;
	encryptionKeyVault: EncryptionKeyVault;
	thresholdKey?: never;
}

export const modules: DynamicModules = {} as never;
export * from './analytics';
export * from './asset';
export * from './config';
export * from './utils';
