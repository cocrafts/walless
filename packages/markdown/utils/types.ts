import { LayoutRectangle } from 'react-native';

export interface ThemeColors {
	primary: string;
	secondary: string;
	background: string;
	card: string;
	border: string;
	notification: string;
	text: string;
	link: string;
	alt: string;
	altText: string;
}

export interface MarkdownConfig {
	fontFamily: string;
	fontSize: number;
	layout: LayoutRectangle;
	dark: boolean;
	colors: ThemeColors;
}

export interface MarkdownState {
	key: string;
	config: MarkdownConfig;
	color?: string;
	fontStyle?: 'normal' | 'italic';
	fontWeight?:
		| 'normal'
		| 'bold'
		| '100'
		| '200'
		| '300'
		| '400'
		| '500'
		| '600'
		| '700'
		| '800'
		| '900'
		| undefined;
}
