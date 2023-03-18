import { EncryptedWithPasscode, HydratedKey } from '@walless/core';
import { Dexie, Table } from 'dexie';

export interface UserProfile {
	id?: string;
	email?: string;
	name?: string;
	profileImage?: string;
}

export interface SettingRecord {
	id?: number;
	version: string;
	profile?: UserProfile;
}

export type PrivateKeyRecord = EncryptedWithPasscode & {
	id?: string;
	type: string;
};

export interface CollectibleMetadata {
	name: string;
	description: string;
	collectionName: string;
	imageUri?: string;
}

export type CollectibleRecord = {
	id?: string;
	metadata?: CollectibleMetadata;
};

export enum Networks {
	ethereum = 'ethereum',
	solana = 'solana',
	sui = 'sui',
}

export interface PublicKeyRecord {
	id?: string;
	privateKeyId: string;
	network: Networks;
}

export type EncryptionKeyRecord = HydratedKey & {
	id?: string;
};

export interface WallessDB {
	instance: Dexie;
	settings: Table<SettingRecord, number>;
	publicKeys: Table<PublicKeyRecord, string>;
	privateKeys: Table<PrivateKeyRecord, string>;
	encryptionKeys: Table<EncryptionKeyRecord, string>;
	collectibles: Table<CollectibleRecord, string>;
}
