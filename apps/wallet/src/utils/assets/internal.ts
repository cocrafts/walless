import type { ImageSourcePropType } from 'react-native';

type WidgetAsset = {
	storeMeta: {
		iconUri: ImageSourcePropType;
		coverUri: ImageSourcePropType;
	};
	widgetMeta: {
		cardIcon: ImageSourcePropType;
		cardMark: ImageSourcePropType;
		cardBackground: ImageSourcePropType;
	};
};

type SettingAsset = {
	icon: ImageSourcePropType;
};

export type Asset = {
	widget: Record<string, WidgetAsset>;
	setting: Record<string, SettingAsset>;
	misc: Record<string, ImageSourcePropType>;
};
