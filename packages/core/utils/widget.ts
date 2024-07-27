import type { Nft, Token } from '@walless/core';
import type { TabContainerStyle } from '@walless/gui';
import type { NftDocument, TokenDocument } from '@walless/store';

import type { Networks } from './common';

export interface WidgetStoreOptions {
	iconUri: string;
	iconSize: number;
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

export enum WidgetType {
	NETWORK = 'Network',
	GAME = 'Game',
	DEFI = 'DeFi',
	NFT = 'NFT',
	COMMUNITY = 'Community',
}

export interface CustomWalletAdvertisement {
	title: string;
	link: string;
	image: string;
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
	activeTabStyle: TabContainerStyle;
	advertisements: CustomWalletAdvertisement[];
	tokens?: TokenDocument<Token>[];
	nfts?: NftDocument<Nft>[];
	network: Networks;
}

export type CustomMetadata = CustomWalletMetadata | WidgetNetworkMetadata;

export enum WidgetCategory {
	GAME = 'Game',
	CUSTOM_WALLET = 'CustomWallet',
	NETWORK = 'Network',
}

export interface Widget {
	name: string;
	networks: Networks[];
	version: string;
	timestamp?: string;
	widgetType: WidgetType;
	category: WidgetCategory;
	storeMeta: WidgetStoreOptions;
	customMetadata?: CustomMetadata;
}
