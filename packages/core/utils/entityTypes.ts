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

export interface AssetMetadata {
	name?: string;
	symbol?: string;
	imageUri?: string;
}

export interface TokenAccount {
	mint?: string;
	address?: string;
	price?: number;
	balance: number;
}

export interface Token {
	network: string;
	symbol: string;
	account: TokenAccount;
	metadata?: AssetMetadata;
}

export interface Collectible {
	network: string;
	collectionId?: string;
	metadata?: AssetMetadata;
}
