import { type ImageSourcePropType } from 'react-native';
import { BN } from 'bn.js';

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
	balance: number;
}

export interface Collectible {
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
