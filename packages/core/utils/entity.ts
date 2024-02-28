import type { NetworkCluster, Networks } from './common';

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

export type NetworkClusterMap = Record<Networks, NetworkCluster>;

export interface Config {
	version?: string;
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
	cluster: NetworkCluster;
}

export interface Collection {
	network: string;
	metadata?: AssetMetadata;
	cluster: NetworkCluster;
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
	cluster: NetworkCluster;
}

export interface TrustedDomain {
	trusted: boolean;
	connectCount: number;
	connect: boolean;
}
