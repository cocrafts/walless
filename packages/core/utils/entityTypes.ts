import { type ImageSourcePropType } from 'react-native';

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

export type ExtensionType = 'layout' | 'dApp' | 'native';

export interface ExtensionConfig {
	id: string;
	color?: string;
	icon: ImageSourcePropType;
	type: ExtensionType;
}
