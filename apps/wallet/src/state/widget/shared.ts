import { Networks } from '@walless/core';
import type { WidgetDocument } from '@walless/store';

// TODO: this mocked data is for web only
export const mockWidgets: WidgetDocument[] = [
	{
		_id: 'pixeverse',
		name: 'Pixeverse',
		networks: [Networks.solana],
		version: '0.1.8',
		type: 'Widget',
		widgetType: 'Hybrid',
		timestamp: new Date().toISOString(),
		storeMeta: {
			iconUri: '/img/explore/logo-pixeverse.png',
			iconSize: 40,
			iconColor: '#ffffff',
			coverUri: '/img/explore/thumbnail-pixeverse.png',
			description:
				'A hyper casual pixel-style game in which players step into the shoes of their ...',
			loveCount: 46,
			activeCount: 202,
		},
		networkMeta: {
			backgroundUri: '/img/network/sky-card-bg.png',
			markUri: '/img/explore/logo-pixeverse.png',
			iconUri: '/img/explore/logo-pixeverse.png',
			iconColor: '#ffffff',
			iconSize: 40,
		},
	},
	{
		_id: 'solana',
		name: 'Solana',
		networks: [Networks.solana],
		version: '0.9.1',
		type: 'Widget',
		widgetType: 'Layout',
		timestamp: new Date().toISOString(),
		storeMeta: {
			iconUri: '/img/explore/logo-solana.png',
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
			iconUri: '/img/network/solana-icon-sm.svg',
			iconColor: '#000000',
			iconSize: 16,
		},
	},
	{
		_id: 'sui',
		name: 'Sui',
		networks: [Networks.sui],
		version: '0.0.1',
		type: 'Widget',
		widgetType: 'Layout',
		timestamp: new Date().toISOString(),
		storeMeta: {
			iconUri: '/img/explore/logo-sui.png',
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
	{
		_id: 'tezos',
		name: 'Tezos',
		networks: [Networks.sui],
		version: '0.0.1',
		type: 'Widget',
		widgetType: 'Layout',
		timestamp: new Date().toISOString(),
		storeMeta: {
			iconUri: '/img/network/tezos-icon-sm.png',
			iconSize: 26,
			iconColor: '#2D7DF8',
			coverUri: '/img/explore/thumbnail-tezos.png',
			description:
				'A blockchain designed to evolve. Security focused. Upgradeable. Built to last',
			loveCount: 100,
			activeCount: 567,
		},
		networkMeta: {
			backgroundUri: '/img/network/sky-card-bg.png',
			markUri: '/img/network/tezos-icon-lg.png',
			iconUri: '/img/network/tezos-icon-sm.png',
			iconColor: '#2D7DF8',
			iconSize: 12,
		},
	},
	{
		_id: 'aptos',
		name: 'Aptos',
		networks: [Networks.aptos],
		version: '0.0.1',
		type: 'Widget',
		widgetType: 'Layout',
		timestamp: new Date().toISOString(),
		storeMeta: {
			iconUri: '/img/explore/logo-aptos.png',
			iconSize: 26,
			iconColor: 'black',
			coverUri: '/img/explore/thumbnail-aptos.png',
			description:
				'Committed to developing products and applications on the Aptos blockchain that redefine the web3 user experience.',
			loveCount: 46,
			activeCount: 202,
		},
		networkMeta: {
			backgroundUri: '/img/network/sky-card-bg.png',
			markUri: '/img/explore/aptos-icon.svg',
			iconUri: '/img/explore/aptos-icon.svg',
			iconColor: 'transparent',
			iconSize: 40,
		},
	},
	{
		_id: 'tRexRunner',
		name: 'T-Rex Runner',
		networks: [],
		version: '0.1.8',
		type: 'Widget',
		widgetType: 'Hybrid',
		timestamp: new Date().toISOString(),
		storeMeta: {
			iconUri: '/img/t-rex-runner/runner-icon.png',
			iconSize: 40,
			iconColor: '#ffffff',
			coverUri: '/img/t-rex-runner/runner-bg.png',
			description: 'dApp version of the T-rex Runner you already known!',
			loveCount: 46,
			activeCount: 202,
		},
		networkMeta: {
			backgroundUri: '/img/network/sky-card-bg.png',
			markUri: '/img/t-rex-runner/runner-icon.png',
			iconUri: '/img/t-rex-runner/runner-icon.png',
			iconColor: '#ffffff',
			iconSize: 40,
		},
	},
	// {
	// 	_id: '000003',
	// 	name: 'Under Realm',
	// 	version: '0.1.8',
	// 	type: 'Widget',
	// 	widgetType: 'Hybrid',
	// 	timestamp: new Date().toISOString(),
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

const devWidgets: WidgetDocument[] = [
	{
		_id: 'tezosDApp',
		name: 'Tezos DApp',
		networks: [],
		version: '0.0.1',
		type: 'Widget',
		widgetType: 'Hybrid',
		timestamp: new Date().toISOString(),
		storeMeta: {
			iconUri: '/img/network/tezos-icon-sm.png',
			iconSize: 26,
			iconColor: '#2D7DF8',
			coverUri: '/img/explore/thumbnail-tezos.png',
			description: 'Example DApp on Tezos',
			loveCount: 100,
			activeCount: 567,
		},
	} as never,
];

if (__DEV__) {
	mockWidgets.push(...devWidgets);
}
