import {
	EncryptedWithPasscode,
	ExtensionConfig,
	Networks,
	Setting,
	Token,
} from '@walless/core';
import PouchDB from 'pouchdb-core';

export type DocumentType =
	| 'Setting'
	| 'PrivateKey'
	| 'PublicKey'
	| 'Token'
	| 'Extension';

export type PouchDocument<T> = PouchDB.Core.Document<
	T & { type: DocumentType; _rev?: string }
>;

export type SettingDocument = PouchDocument<Setting>;

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
