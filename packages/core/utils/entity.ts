import type { Endpoint, Networks } from './common';

export interface AptosTokenMetadata {
	creatorAddress: string;
	ownerAddress: string;
	collectionId: string;
	collectionName: string;
	collectionUri: string;
	tokenId: string;
	tokenName: string;
	tokenImageUri: string;
	tokenDescription: string;
}

export interface System {
	deviceId?: string;
}

export interface Setting {
	profile: UserProfile;
	config: Config;
}

export type EndpointMap = Record<Networks, Endpoint>;

export interface Config {
	storageVersion?: number;
	hideBalance: boolean;
	latestLocation: string;
	notificationToken?: string;
}

export interface RemoteConfig {
	experimentalEnabled: boolean;
	deepAnalyticsEnabled: boolean;
	minimalVersion: string;
}

export interface UserProfile {
	id?: string;
	email?: string;
	name?: string;
	walletCount?: number;
	profileImage?: string;
}

export interface AssetMetadata {
	name?: string;
	symbol?: string;
	imageUri?: string;
	/* eslint-disable */
	sod?: any;
	aptosToken?: any;
	/* eslint-enable */
	description?: string;
	attributes?: {
		key: string;
		value: string;
	}[];
}

export interface TokenAccount {
	mint: string;
	owner: string;
	address: string;
	quotes?: Record<string, number>;
	balance: string;
	decimals: number;

	/**
	 * This attribute is used for tezos token identifier
	 * (combine with address - smart contract address)
	 * */
	tokenId?: number;
}

export interface Token {
	network: string;
	account: TokenAccount;
	metadata?: AssetMetadata;
}

export interface Collection {
	network: string;
	metadata?: AssetMetadata;
}

export interface CollectibleAccount {
	mint: string;
	owner: string;
	address: string;
	amount: number;
}

export interface Collectible {
	network: string;
	collectionId: string;
	collectionAddress: string;
	metadata: AssetMetadata;
	account: CollectibleAccount;
}

export interface TrustedDomain {
	trusted: boolean;
	connectCount: number;
	connect: boolean;
}
