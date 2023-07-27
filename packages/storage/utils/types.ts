import type {
	Collectible,
	EncryptedWithPasscode,
	ExtensionConfig,
	HydratedKey,
	Networks,
	Token,
	UserProfile,
} from '@walless/core';
import type { Dexie, Table } from 'dexie';

export interface SettingRecord {
	id?: number;
	version: string;
	profile?: UserProfile;
}

export type PrivateKeyRecord = EncryptedWithPasscode & {
	id?: string;
	type: string;
};

/* TODO: work with Tuan Tran to resolve below duplication between Collectible and Collection */
export type CollectibleRecord = Collectible & {
	id?: string;
};

export type CollectionRecord = Collectible & {
	id?: string;
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

export type TokenRecord = Token & {
	id?: string;
};

export interface PublicKeyRecord {
	id?: string;
	privateKeyId: string;
	network: Networks;
}

export type EncryptionKeyRecord = HydratedKey & {
	id?: string;
};

export type ExtensionRecord = ExtensionConfig & {
	timestamp: Date;
};

export type TrustedDomain = {
	id?: string;
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
	extensions: Table<ExtensionRecord, string>;
	trustedDomains: Table<TrustedDomain, string>;
}
