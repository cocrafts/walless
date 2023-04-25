import { Metadata as MplMetadata } from '@metaplex-foundation/mpl-token-metadata';

export interface Setting {
	version: string;
	profile: UserProfile;
}

export interface UserProfile {
	id?: string;
	email?: string;
	name?: string;
	profileImage?: string;
}

export interface LegacySolanaMetadata {
	address: string;
	name?: string;
	symbol?: string;
	decimals?: number;
	logoURI?: string;
	extensions?: Record<string, string>;
	tags: string[];
}

export interface AssetMetadata {
	name?: string;
	symbol?: string;
	imageUri?: string;
	mpl?: MplMetadata;
}

export interface TokenAccount {
	mint?: string;
	owner?: string;
	address?: string;
	price?: number;
	balance: string;
	decimals: number;
}

export interface Token {
	network: string;
	account: TokenAccount;
	metadata?: AssetMetadata;
}

export interface Collectible {
	network: string;
	collectionId?: string;
	metadata?: AssetMetadata;
}
