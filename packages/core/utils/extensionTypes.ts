export interface ExtensionStoreMetadata {
	iconUri: string;
	iconSize: number;
	iconColor: string;
	coverUri: string;
	description: string;
	loveCount: number;
	activeCount: number;
}

export interface ExtensionNetworkMetadata {
	backgroundUri: string;
	markUri: string;
	iconUri: string;
	iconSize: number;
	iconColor: string;
}

export type ExtensionType = 'layout' | 'dApp' | 'native';

export interface ExtensionConfig {
	id: string;
	name: string;
	version: string;
	type: ExtensionType;
	storeMeta: ExtensionStoreMetadata;
	networkMeta: ExtensionNetworkMetadata;
}
