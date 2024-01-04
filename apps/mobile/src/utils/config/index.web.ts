import type { UniversalAsset } from '@walless/ioc';

export const asset: UniversalAsset = {
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
		walless: { uri: '/img/icon.png' },
		unknownToken: { uri: '/img/send-token/unknown-token.jpeg' },
	},
};

export const w3aBaseUrl = __DEV__ ? location.origin : 'https:app.walless.io';

export const environment = {
	FIREBASE_API_KEY,
	BUILD_TARGET,
	BROWSER_CLIENT_ID,
	EXTENSION_CLIENT_ID,
	FIREBASE_AUTH_DOMAIN,
	FIREBASE_PROJECT_ID,
	FIREBASE_STORAGE_BUCKET,
	FIREBASE_MESSAGING_SENDER_ID,
	FIREBASE_APP_ID,
	FIREBASE_MEASUREMENT_ID,
	FIREBASE_VAPID_KEY,
	GATEFI_ENDPOINT,
	GATEFI_MERCHANT_ID,
	WEB3AUTH_ID,
	GRAPHQL_ENDPOINT,
	PIXEVERSE_ENDPOINT,
	PIXEVERSE_ORIGIN,
	PIXEVERSE_URL,
	SOLANA_CLUSTER_URL,
	GASILON_ENDPOINT,
};
