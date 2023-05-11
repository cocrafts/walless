import {
	type AssetMetadata,
	type EncryptedWithPasscode,
	type ExtensionConfig,
	type HydratedKey,
	type Setting,
	type Token,
	Networks,
} from '@walless/core';
import PouchDB from 'pouchdb-core';

export type DocumentType =
	| 'Setting'
	| 'EncryptionKey'
	| 'PrivateKey'
	| 'PublicKey'
	| 'Token'
	| 'Metadata'
	| 'Extension';

export interface IndexedDocument {
	type: DocumentType;
	network?: Networks;
	timestamp?: string;
}

export type PouchDocument<T> = PouchDB.Core.Document<
	T & IndexedDocument & { _rev?: string }
>;

export type SettingDocument = PouchDocument<Setting>;

export type EncryptionKeyDocument = PouchDocument<HydratedKey>;

export type PrivateKeyDocument = PouchDocument<
	EncryptedWithPasscode & {
		keyType: string;
	}
>;

export type PublicKeyDocument = PouchDocument<{
	privateKeyId: string;
	network: Networks;
}>;

export type ExtensionDocument = PouchDocument<ExtensionConfig>;

export type TokenDocument = PouchDocument<Token>;

export type MetadataDocument = PouchDocument<AssetMetadata>;
