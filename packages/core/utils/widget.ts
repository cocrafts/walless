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

export interface WidgetNetworkOptions {
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
}

export interface Widget {
	name: string;
	networks: Networks[];
	version: string;
	timestamp?: string;
	widgetType: WidgetType;
	storeMeta: WidgetStoreOptions;
	networkMeta: WidgetNetworkOptions;
}
