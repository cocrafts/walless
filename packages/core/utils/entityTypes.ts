import { type Metadata as MplMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { type SuiObjectData } from '@mysten/sui.js';

export interface Setting {
	version: string;
	profile: UserProfile;
	hideBalance: boolean;
}

export interface UserProfile {
	id?: string;
	email?: string;
	name?: string;
	profileImage?: string;
}

export interface AssetMetadata {
	name?: string;
	symbol?: string;
	imageUri?: string;
	mpl?: MplMetadata;
	sod?: SuiObjectData;
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

export interface TrustedDomain {
	trusted: boolean;
	timestamp: string;
	connectCount: number;
}
