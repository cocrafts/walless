import type { ImageSourcePropType } from 'react-native';
import type { Engine } from '@walless/engine';
import type { EncryptionKeyVault } from '@walless/messaging';
import type { Database } from '@walless/store';
import type { GraphQLClient } from 'graphql-request';

export interface NativeConfig {
	FIREBASE_API_KEY: string;
	BUILD_TARGET: string;
	BROWSER_CLIENT_ID: string;
	EXTENSION_CLIENT_ID: string;
	FIREBASE_AUTH_DOMAIN: string;
	FIREBASE_PROJECT_ID: string;
	FIREBASE_STORAGE_BUCKET: string;
	FIREBASE_MESSAGING_SENDER_ID: string;
	FIREBASE_APP_ID: string;
	FIREBASE_MEASUREMENT_ID: string;
	WEB3AUTH_ID: string;
	GRAPHQL_ENDPOINT: string;
	PIXEVERSE_ENDPOINT: string;
	PIXEVERSE_ORIGIN: string;
	PIXEVERSE_URL: string;
	SOLANA_CLUSTER_URL: string;
}

export interface UniversalAsset {
	widget: {
		solana: {
			cardIcon: ImageSourcePropType;
			cardMark?: ImageSourcePropType;
			cardBackground: ImageSourcePropType;
		};
		sui: {
			cardIcon: ImageSourcePropType;
			cardMark?: ImageSourcePropType;
			cardBackground: ImageSourcePropType;
		};
		tezos: {
			cardIcon: ImageSourcePropType;
			cardMark?: ImageSourcePropType;
			cardBackground: ImageSourcePropType;
		};
		aptos: {
			cardIcon: ImageSourcePropType;
			cardMark?: ImageSourcePropType;
			cardBackground: ImageSourcePropType;
		};
	};
	setting: {
		solana: {
			icon: ImageSourcePropType;
		};
		sui: {
			icon: ImageSourcePropType;
		};
		tezos: {
			icon: ImageSourcePropType;
		};
		aptos: {
			icon: ImageSourcePropType;
		};
	};
}

export interface DynamicModules {
	config: NativeConfig;
	asset: UniversalAsset;
	engine: Engine;
	storage: Database;
	qlClient: GraphQLClient;
	encryptionKeyVault: EncryptionKeyVault;
	thresholdKey?: never;
}

export const modules: DynamicModules = {} as never;
export * from './utils';
