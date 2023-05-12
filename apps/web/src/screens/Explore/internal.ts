import { type ExtensionDocument } from '@walless/store';

export interface LayoutCardProps {
	item: ExtensionDocument;
	onAddPress?: (item: ExtensionDocument) => void;
	onLovePress?: (item: ExtensionDocument) => void;
}

export const mockLayoutCards: ExtensionDocument[] = [
	{
		_id: 'solana',
		name: 'Solana',
		version: '0.9.1',
		type: 'Extension',
		extensionType: 'Layout',
		timestamp: new Date().toISOString(),
		storeMeta: {
			iconUri: '/img/network/solana-icon-sm.png',
			iconSize: 24,
			iconColor: '#0a090e',
			coverUri: '/img/explore/thumbnail-solana.png',
			description:
				'Powerful for developers, fast for everyone. Very low, and consistent transaction fees.',
			loveCount: 90,
			activeCount: 502,
		},
		networkMeta: {
			backgroundUri: '/img/network/sky-card-bg.png',
			markUri: '/img/network/solana-icon-lg.png',
			iconUri: '/img/network/solana-icon-sm.png',
			iconColor: '#000000',
			iconSize: 16,
		},
	},
	{
		_id: 'sui',
		name: 'Sui',
		version: '0.0.1',
		type: 'Extension',
		extensionType: 'Layout',
		timestamp: new Date().toISOString(),
		storeMeta: {
			iconUri: '/img/network/sui-icon-sm.png',
			iconSize: 18,
			iconColor: '#FFFFFF',
			coverUri: '/img/explore/thumbnail-sui.png',
			description:
				'Layer 1 blockchain designed to make digital asset ownership fast, private, secure, and accessible to everyone.',
			loveCount: 100,
			activeCount: 567,
		},
		networkMeta: {
			backgroundUri: '/img/network/sky-card-bg.png',
			markUri: '/img/network/sui-icon-lg.png',
			iconUri: '/img/network/sui-icon-sm.png',
			iconColor: '#FFFFFF',
			iconSize: 12,
		},
	},
	// {
	// 	_id: '000003',
	// 	name: 'Under Realm',
	// 	version: '0.1.8',
	// 	type: 'Extension',
	// 	extensionType: 'Layout',
	// 	timestamp: new Date(),
	// 	storeMeta: {
	// 		iconUri: '/img/explore/logo-under-realm.png',
	// 		iconSize: 24,
	// 		iconColor: '#000000',
	// 		coverUri: '/img/explore/thumbnail-under-realm.png',
	// 		description:
	// 			'Free-to-play Strategy Trading Card game. Play and also built by community.',
	// 		loveCount: 46,
	// 		activeCount: 202,
	// 	},
	// 	networkMeta: {
	// 		backgroundUri: '/img/network/sky-card-bg.png',
	// 		markUri: '/img/network/solana-icon-lg.png',
	// 		iconUri: '/img/explore/thumbnail-under-realm.png',
	// 		iconColor: '#000000',
	// 		iconSize: 16,
	// 	},
	// },
];
