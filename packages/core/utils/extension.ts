export interface ExtensionStoreMetadata {
	iconUri: string;
	iconSize: number;
	iconColor?: string;
	iconActiveColor?: string;
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

export type ExtensionType = 'Layout' | 'DApp' | 'Native';

export interface ExtensionConfig {
	name: string;
	version: string;
	timestamp?: string;
	extensionType: ExtensionType;
	storeMeta: ExtensionStoreMetadata;
	networkMeta: ExtensionNetworkMetadata;
}
