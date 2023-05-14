import {
	type AssetMetadata,
	type EncryptedWithPasscode,
	type Endpoint,
	type ExtensionConfig,
	type HydratedKey,
	type Networks,
	type Setting,
	type Token,
	type TrustedDomain,
} from '@walless/core';
import type PouchDB from 'pouchdb-core';

export type DocumentType =
	| 'Setting'
	| 'EncryptionKey'
	| 'PrivateKey'
	| 'PublicKey'
	| 'Token'
	| 'Metadata'
	| 'TrustedDomain'
	| 'Extension';

export interface IndexedDocument {
	type: DocumentType;
	network?: Networks;
	endpoint?: Endpoint;
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

export type TrustedDomainDocument = PouchDocument<TrustedDomain>;
