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
	tokens?: Map<string, CustomWalletAssets>;
	nfts?: Map<string, CustomWalletAssets>;
	network: Networks;
}

export const categories = ['Network', 'Game', 'Community'];

export type CustomMetadata = CustomWalletMetadata | WidgetNetworkMetadata;

export enum WidgetCategory {
	GAME = 'Game',
	CUSTOM_WALLET = 'CustomWallet',
	NETWORK = 'Network',
}

export const communityList = [WidgetCategory.CUSTOM_WALLET];

export interface Widget {
	name: string;
	networks: Networks[];
	version: string;
	timestamp?: string;
	category: WidgetCategory;
	storeMeta: WidgetStoreOptions;
	metadata?: CustomMetadata;
}
