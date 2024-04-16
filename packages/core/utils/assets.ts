import type { NetworkCluster, Networks } from './common';

export type Nft = {
	network: Networks;
	cluster: NetworkCluster;
	amount: number;
	owner: string;
	collectionId?: string;
} & NftMetadata;

export type NftMetadata = {
	name: string;
	image: string;
	description?: string;
};

export type Collection = {
	network: string;
	cluster: NetworkCluster;
} & CollectionMetadata;

export type CollectionMetadata = {
	name: string;
	image: string;
};

export type Token = {
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

export type SuiTokenMetadata = TokenMetadata & {
	decimals: number;
};

export type SolanaToken = Token & {
	mint: string;
	ata: string;
	amount: string;
	decimals: number;
};

export type SolanaCollectible = Nft & {
	mint: string;
	ata: string;
	collectionAddress: string;
	symbol: string;
	attributes?: {
		key: string;
		value: string;
	}[];
};

export type SolanaCollection = Collection & {
	symbol: string;
	description?: string;
	attributes?: {
		key: string;
		value: string;
	}[];
};

export type SuiNft = Nft & {
	objectId: string;
};

export type SuiToken = Token & {
	coinObjectId: string;
	coinType: string;
};
