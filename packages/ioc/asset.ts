import type { ImageSourcePropType } from 'react-native';

export interface UniversalAsset {
	widget: {
		solana: {
			storeMeta: {
				iconUri: ImageSourcePropType;
				coverUri: ImageSourcePropType;
			};
			widgetMeta: {
				cardIcon: ImageSourcePropType;
				cardMark?: ImageSourcePropType;
				cardBackground: ImageSourcePropType;
			};
		};
		sui: {
			storeMeta: {
				iconUri: ImageSourcePropType;
				coverUri: ImageSourcePropType;
			};
			widgetMeta: {
				cardIcon: ImageSourcePropType;
				cardMark?: ImageSourcePropType;
				cardBackground: ImageSourcePropType;
			};
		};
		tezos: {
			storeMeta: {
				iconUri: ImageSourcePropType;
				coverUri: ImageSourcePropType;
			};
			widgetMeta: {
				cardIcon: ImageSourcePropType;
				cardMark?: ImageSourcePropType;
				cardBackground: ImageSourcePropType;
			};
		};
		aptos: {
			storeMeta: {
				iconUri: ImageSourcePropType;
				coverUri: ImageSourcePropType;
			};
			widgetMeta: {
				cardIcon: ImageSourcePropType;
				cardMark?: ImageSourcePropType;
				cardBackground: ImageSourcePropType;
			};
		};
		pixeverse: {
			storeMeta: {
				iconUri: ImageSourcePropType;
				coverUri: ImageSourcePropType;
			};
			widgetMeta: {
				cardIcon: ImageSourcePropType;
			};
		};
		tRexRunner: {
			storeMeta: {
				iconUri: ImageSourcePropType;
				coverUri: ImageSourcePropType;
			};
			widgetMeta: {
				cardIcon: ImageSourcePropType;
			};
		};
	};
	setting: {
		solana: {
			icon: ImageSourcePropType;
		};
		sui: {
			icon: ImageSourcePropType;
		};
		tezos: {
			icon: ImageSourcePropType;
		};
		aptos: {
			icon: ImageSourcePropType;
		};
	};
	tabBar?: {
		explore: ImageSourcePropType;
		walless: ImageSourcePropType;
	};
	misc: {
		walless: ImageSourcePropType;
		unknownToken: ImageSourcePropType;
	};
}
