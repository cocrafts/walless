import type { TabItemStyle } from '@walless/gui';

import type { Networks } from './common';

export interface WidgetStoreOptions {
	iconUri: string;
	iconSize?: number;
	iconColor?: string;
	iconActiveColor?: string;
	coverUri: string;
	description: string;
	loveCount: number;
	activeCount: number;
}

export interface WidgetNetworkMetadata {
	backgroundUri: string;
	markUri: string;
	iconUri: string;
	iconSize: number;
	iconColor: string;
}

export interface CustomWalletAdvertisement {
	title: string;
	link: string;
	image: string;
}

export interface CustomWalletAssets {
	mintAddress: string;
	amount?: number;
}

export interface CustomWalletMetadata {
	coverBanner: string;
	iconSrc: string;
	backgroundColor: string;
	actionButtonBackgroundColors: {
		send: string;
		receive: string;
		buy: string;
		swap: string;
	};
	activeTabStyle?: TabItemStyle;
	advertisements: CustomWalletAdvertisement[];
	tokens?: Record<string, CustomWalletAssets>;
	nfts?: Record<string, CustomWalletAssets>;
	network: Networks;
}

export enum WidgetCategories {
	NETWORK = 'Network',
	GAME = 'Game',
	COMMUNITY = 'Community',
}

export enum WidgetSubcategories {
	CUSTOM_WALLET = 'Custom Wallet',
	NETWORK = 'Network',
	GAME = 'Game',
}

export type CustomMetadata = CustomWalletMetadata | WidgetNetworkMetadata;

export const SubcategoryToCategoryMapping: Record<
	WidgetSubcategories,
	WidgetCategories
> = {
	[WidgetSubcategories.CUSTOM_WALLET]: WidgetCategories.COMMUNITY,
	[WidgetSubcategories.NETWORK]: WidgetCategories.NETWORK,
	[WidgetSubcategories.GAME]: WidgetCategories.GAME,
};

export interface Widget {
	name: string;
	networks: Networks[];
	version: string;
	timestamp?: string;
	category: WidgetSubcategories;
	storeMeta: WidgetStoreOptions;
	metadata?: CustomMetadata;
}
