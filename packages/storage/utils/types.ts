import { EncryptedWithPasscode, HydratedKey } from '@walless/core';
import { Dexie, Table } from 'dexie';

export interface SettingRecord {
	id?: number;
	version: string;
}

export type PrivateKeyRecord = EncryptedWithPasscode & {
	id?: string;
};

export type EncryptionKeyRecord = HydratedKey & {
	id?: string;
};

export interface UserProfile {
	id?: string;
	avatarUrl?: string;
}

export interface WallessDB {
	instance: Dexie;
	settings: Table<SettingRecord, number>;
	privateKeys: Table<PrivateKeyRecord, string>;
	encryptionKeys: Table<EncryptionKeyRecord, string>;
}
