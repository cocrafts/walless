import { ImageSourcePropType } from 'react-native';

export type LayoutItem = {
	id: string;
	name?: string;
	icon?: ImageSourcePropType;
	projectLayout?: React.FC;
};

export type LayoutProxy = Record<string, LayoutItem>;
