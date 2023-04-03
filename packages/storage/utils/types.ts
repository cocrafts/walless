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

export interface Metadata {
	name?: string;
	symbol?: string;
	imageUri?: string;
}

export type CollectibleRecord = {
	id?: string;
	collectionId?: string;
	metadata?: Metadata;
};

export type CollectionRecord = {
	id?: string;
	metadata?: Metadata;
};

export interface TokenBalance {
	mint: string;
	address?: string;
	balance: number | string;
}

export type WalletRecord = {
	id?: string;
	tokens?: Record<string, TokenBalance>;
	network: string;
};

export type TokenRecord = {
	id?: string;
	metadata?: Metadata;
	network: string;
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

export type TrustedDomain = {
	id: string;
	domainName: string;
	trusted: boolean;
	timestamp: Date;
	connectCount: number;
};

export interface WallessDB {
	instance: Dexie;
	settings: Table<SettingRecord, number>;
	publicKeys: Table<PublicKeyRecord, string>;
	privateKeys: Table<PrivateKeyRecord, string>;
	encryptionKeys: Table<EncryptionKeyRecord, string>;
	collectibles: Table<CollectibleRecord, string>;
	collections: Table<CollectionRecord, string>;
	wallets: Table<WalletRecord, string>;
	tokens: Table<TokenRecord, string>;
	trustedDomains: Table<TrustedDomain, string>;
}
