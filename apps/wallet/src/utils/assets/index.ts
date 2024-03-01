import type { Asset } from './internal';

const assets: Asset = {
	widget: {
		solana: {
			storeMeta: {
				iconUri: require('assets/img/explore/logo-solana.png'),
				coverUri: require('assets/img/explore/thumbnail-solana.png'),
			},
			widgetMeta: {
				cardIcon: require('assets/img/widget/solana-icon.png'),
				cardMark: require('assets/img/widget/solana-mark.png'),
				cardBackground: require('assets/img/widget/sky-card-bg.png'),
			},
		},
		sui: {
			storeMeta: {
				iconUri: require('assets/img/explore/logo-sui.png'),
				coverUri: require('assets/img/explore/thumbnail-sui.png'),
			},
			widgetMeta: {
				cardIcon: require('assets/img/widget/sui-icon.png'),
				cardMark: require('assets/img/widget/sui-mark.png'),
				cardBackground: require('assets/img/widget/sky-card-bg.png'),
			},
		},
		tezos: {
			storeMeta: {
				iconUri: require('assets/img/explore/logo-tezos.png'),
				coverUri: require('assets/img/explore/thumbnail-tezos.png'),
			},
			widgetMeta: {
				cardIcon: require('assets/img/widget/tezos-icon.png'),
				cardBackground: require('assets/img/widget/tezos-card-bg.png'),
			},
		},
		aptos: {
			storeMeta: {
				iconUri: require('assets/img/explore/logo-aptos.png'),
				coverUri: require('assets/img/explore/thumbnail-aptos.png'),
			},
			widgetMeta: {
				cardIcon: require('assets/img/widget/aptos-icon.png'),
				cardBackground: require('assets/img/widget/sky-card-bg.png'),
				cardMark: require('assets/img/widget/aptos-mark.png'),
			},
		},
		pixeverse: {
			storeMeta: {
				iconUri: require('assets/img/explore/logo-pixeverse.png'),
				coverUri: require('assets/img/explore/thumbnail-pixeverse.png'),
			},
			widgetMeta: {
				cardIcon: require('assets/img/widget/pixeverse-icon.png'),
			},
		},
		tRexRunner: {
			storeMeta: {
				iconUri: require('assets/img/explore/logo-runner.png'),
				coverUri: require('assets/img/explore/thumbnail-runner.png'),
			},
			widgetMeta: {
				cardIcon: require('assets/img/widget/runner-icon.png'),
			},
		},
	},
	setting: {
		solana: {
			icon: require('assets/img/setting/icon-solana.png'),
		},
		sui: {
			icon: require('assets/img/setting/icon-sui.png'),
		},
		tezos: {
			icon: require('assets/img/setting/icon-tezos.png'),
		},
		aptos: {
			icon: require('assets/img/setting/icon-aptos.png'),
		},
	},
	misc: {
		walless: require('assets/img/icon.png'),
		unknownToken: require('assets/img/send-token/unknown-token.jpeg'),
		referralGradientBackgroundImage: require('assets/background-image/referral.png'),
	},
};

export default assets;
