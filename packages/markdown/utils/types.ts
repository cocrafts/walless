import type { LayoutRectangle } from 'react-native';

export type FontWeight =
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
	headingFamily: string;
	fontSize: number;
	fontWeight: FontWeight;
	lineHeight: number;
	layout: LayoutRectangle;
	dark: boolean;
	colors: ThemeColors;
}

export type MarkdownOptions = Partial<Omit<MarkdownConfig, 'colors'>> & {
	colors?: Partial<ThemeColors>;
};

export interface MarkdownState {
	key: string;
	config: MarkdownConfig;
	color?: string;
	fontStyle?: 'normal' | 'italic';
	fontWeight?: FontWeight;
}
