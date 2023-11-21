export interface WidgetStoreOptions {
	iconUri: string;
	iconSize: number;
	iconColor: string;
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

export type WidgetType = 'Layout' | 'Hybrid' | 'Native';

export interface Widget {
	name: string;
	version: string;
	timestamp?: string;
	widgetType: WidgetType;
	storeMeta: WidgetStoreOptions;
	networkMeta: WidgetNetworkOptions;
}
