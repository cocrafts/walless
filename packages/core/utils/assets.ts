import type { NetworkCluster, Networks } from './common';

export type NftV2 = {
	network: Networks;
	cluster: NetworkCluster;
	amount: number;
	owner: string;
	collectionId: string;
} & NftMetadata;

export type NftMetadata = {
	name: string;
	image: string;
	description?: string;
};

export type CollectionV2 = {
	network: string;
	cluster: NetworkCluster;
} & CollectionMetadata;

export type CollectionMetadata = {
	name: string;
	image: string;
};

export type TokenV2 = {
	network: Networks;
	cluster: NetworkCluster;
	owner: string;
	balance: number;
	quotes?: Record<string, number>;
} & TokenMetadata;

export type TokenMetadata = {
	name: string;
	symbol: string;
	image: string;
};

export type SolanaToken = TokenV2 & {
	mint: string;
	ata: string;
	amount: string;
	decimals: number;
};

export type SolanaCollectible = NftV2 & {
	mint: string;
	ata: string;
	collectionAddress: string;
	symbol: string;
	attributes?: {
		key: string;
		value: string;
	}[];
};

export type SolanaCollection = CollectionV2 & {
	symbol: string;
	description?: string;
	attributes?: {
		key: string;
		value: string;
	}[];
};

export type SuiNft = NftV2 & {
	objectId: string;
};

export type SuiToken = TokenV2 & {
	coinObjectId: string;
	coinType: string;
};
