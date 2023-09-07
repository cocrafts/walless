import type { UniversalAsset } from '@walless/ioc';

export const nativeAsset: UniversalAsset = {
	widget: {
		solana: {
			cardIcon: require('assets/img/widget/solana-icon.png'),
			cardMark: require('assets/img/widget/solana-mark.png'),
			cardBackground: require('assets/img/widget/sky-card-bg.png'),
		},
		sui: {
			cardIcon: require('assets/img/widget/sui-icon.png'),
			cardMark: require('assets/img/widget/sui-mark.png'),
			cardBackground: require('assets/img/widget/sky-card-bg.png'),
		},
		tezos: {
			cardIcon: require('assets/img/widget/tezos-icon.png'),
			cardBackground: require('assets/img/widget/tezos-card-bg.png'),
		},
	},
};

export const resources = {
	walless: {
		icon: require('../../assets/img/icon.png'),
	},
};
