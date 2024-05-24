import type { Asset } from './internal';

const assets: Asset = {
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
		suijump: {
			storeMeta: {
				iconUri: { uri: '/img/explore/logo-suijump.png' },
				coverUri: { uri: '/img/explore/thumbnail-suijump.png' },
			},
			widgetMeta: {
				cardIcon: { uri: '/img/widget/suijump-icon.png' },
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
		walless: { uri: '/img/icon.png' },
		unknownToken: { uri: '/img/send-token/unknown-token.jpeg' },
		swapPlaceholder: { uri: '/img/misc/swap-placeholder.png' },
		referralGradientBackground: {
			uri: '/img/misc/referral-gradient-bg.png',
		},
		loyaltyGradientBackground: {
			uri: '/img/misc/loyalty-gradient-bg.png',
		},
		loyaltyBarGradientBackground: {
			uri: '/img/misc/loyalty-bar-gradient-bg.png',
		},
	},
};

export default assets;
