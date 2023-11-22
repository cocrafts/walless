import type { UniversalAsset } from '@walless/ioc';

export const webAsset: UniversalAsset = {
	widget: {
		solana: {
			storeMeta: {
				iconUri: { uri: '/img/explore/logo-solana.png' },
				coverUri: { uri: '/img/explore/thumbnail-solana.png' },
			},
			widgetMeta: {
				cardIcon: { uri: '/img/widget/solana-icon.png' },
				cardMark: { uri: '/img/widget/solana-mark.png' },
				cardBackground: { uri: '/img/widget/sky-card-bg.png' },
			},
		},
		sui: {
			storeMeta: {
				iconUri: { uri: '/img/explore/logo-sui.png' },
				coverUri: { uri: '/img/explore/thumbnail-sui.png' },
			},
			widgetMeta: {
				cardIcon: { uri: '/img/widget/sui-icon.png' },
				cardMark: { uri: '/img/widget/sui-mark.png' },
				cardBackground: { uri: '/img/widget/sky-card-bg.png' },
			},
		},
		tezos: {
			storeMeta: {
				iconUri: { uri: '/img/explore/logo-tezos.png' },
				coverUri: { uri: '/img/explore/thumbnail-tezos.png' },
			},
			widgetMeta: {
				cardIcon: { uri: '/img/widget/tezos-icon.png' },
				cardBackground: { uri: '/img/widget/tezos-card-bg.png' },
			},
		},
		aptos: {
			storeMeta: {
				iconUri: { uri: '/img/explore/logo-aptos.png' },
				coverUri: { uri: '/img/explore/thumbnail-aptos.png' },
			},
			widgetMeta: {
				cardIcon: { uri: '/img/widget/aptos-icon.png' },
				cardMark: { uri: '/img/widget/aptos-mark.png' },
				cardBackground: { uri: '/img/widget/sky-card-bg.png' },
			},
		},
		pixeverse: {
			storeMeta: {
				iconUri: { uri: '/img/explore/logo-pixeverse.png' },
				coverUri: { uri: '/img/explore/thumbnail-pixeverse.png' },
			},
			widgetMeta: {
				cardIcon: { uri: '/img/widget/pixeverse-icon.png' },
			},
		},
		tRexRunner: {
			storeMeta: {
				iconUri: { uri: '/img/explore/logo-runner.png' },
				coverUri: { uri: '/img/explore/thumbnail-runner.png' },
			},
			widgetMeta: {
				cardIcon: { uri: '/img/widget/runner-icon.png' },
			},
		},
	},
	setting: {
		solana: { icon: { uri: '/img/send-token/icon-solana.png' } },
		sui: { icon: { uri: '/img/send-token/icon-sui.png' } },
		tezos: { icon: { uri: '/img/send-token/icon-tezos.png' } },
		aptos: { icon: { uri: '/img/send-token/icon-aptos.png' } },
	},
	misc: {
		unknownToken: { uri: '/img/send-token/unknown-token.jpeg' },
	},
};

export const resources = {
	walless: {
		icon: {
			uri: '/img/icon.png',
		},
	},
	common: {
		question: {
			uri: '/img/question.png',
		},
	},
};

export const w3aBaseUrl = __DEV__ ? location.origin : 'https:app.walless.io';
