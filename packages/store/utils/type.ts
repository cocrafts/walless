import { EncryptedWithPasscode, Networks, Setting } from '@walless/core';
import PouchDB from 'pouchdb-core';

export type DocumentType = 'Setting' | 'PrivateKey' | 'PublicKey';

export type PouchDocument<T> = PouchDB.Core.Document<
	T & { type: DocumentType }
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
