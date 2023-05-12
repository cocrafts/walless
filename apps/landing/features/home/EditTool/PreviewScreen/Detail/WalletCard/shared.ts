import { type ImageSourcePropType } from 'react-native';

export interface CardSkin {
	backgroundSrc: ImageSourcePropType;
	largeIconSrc: ImageSourcePropType;
	iconSrc: ImageSourcePropType;
	iconSize: number;
	iconColor: string;
}
