import type { UniversalAsset } from '@walless/ioc';

export const webAsset: UniversalAsset = {
	widget: {
		solana: {
			cardIcon: { uri: '/img/widget/solana-icon.png' },
			cardMark: { uri: '/img/widget/solana-mark.png' },
			cardBackground: { uri: '/img/widget/sky-card-bg.png' },
		},
		sui: {
			cardIcon: { uri: '/img/widget/sui-icon.png' },
			cardMark: { uri: '/img/widget/sui-mark.png' },
			cardBackground: { uri: '/img/widget/sky-card-bg.png' },
		},
		tezos: {
			cardIcon: { uri: '/img/widget/tezos-icon.png' },
			cardBackground: { uri: '/img/widget/tezos-card-bg.png' },
		},
		aptos: {
			cardIcon: { uri: '/img/explore/logo-aptos.svg' },
			cardMark: { uri: '/img/explore/logo-aptos-large.svg' },
			cardBackground: { uri: '/img/widget/sky-card-bg.png' },
		},
	},
	setting: {
		solana: { icon: { uri: '/img/send-token/icon-solana.png' } },
		sui: { icon: { uri: '/img/send-token/icon-sui.png' } },
		tezos: { icon: { uri: '/img/send-token/icon-tezos.png' } },
		aptos: { icon: { uri: '/img/send-token/icon-aptos.png' } },
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
