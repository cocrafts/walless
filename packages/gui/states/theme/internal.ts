import { proxy } from 'valtio';

export interface ThemeSizes {
	topNavigation: number;
	leftNavigation: number;
}

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

export interface ThemeState {
	id: string;
	dark: boolean;
	defaultFontFamily: string;
	defaultFontSize: number;
	colors: ThemeColors;
	sizes: ThemeSizes;
}

export const paperTheme: ThemeState = {
	id: 'paper',
	dark: false,
	defaultFontFamily: 'Poppins',
	defaultFontSize: 15,
	colors: {
		primary: '#2C879B',
		secondary: '#EB5757',
		background: '#FFFFFF',
		card: '#FFFFFF',
		border: '#D8D8D8',
		notification: '#FF3B30',
		text: '#222222',
		link: '#2C879B',
		alt: '#8f8f9d',
		altText: '#222222',
	},
	sizes: {
		topNavigation: 70,
		leftNavigation: 70,
	},
};

export const nightTheme: ThemeState = {
	id: 'night',
	dark: true,
	defaultFontFamily: 'Poppins',
	defaultFontSize: 15,
	colors: {
		primary: '#388BDF',
		secondary: '#EB5757',
		background: '#0d1117',
		card: '#FFFFFF',
		border: '#D8D8D8',
		notification: '#FF3B30',
		text: '#C9D1D9',
		link: '#58A6FF',
		altText: '#222222',
		alt: '#545d6c',
	},
	sizes: {
		topNavigation: 70,
		leftNavigation: 70,
	},
};

export const fantasyTheme: ThemeState = {
	id: 'fantasy',
	dark: false,
	defaultFontFamily: 'Poppins',
	defaultFontSize: 15,
	colors: {
		primary: '#2C879B',
		secondary: '#EB5757',
		background: '#002E46',
		card: '#FFFFFF',
		border: '#D8D8D8',
		notification: '#FF3B30',
		text: '#FFFFFF',
		link: '#2C879B',
		alt: '#FFFFFF',
		altText: '#222222',
	},
	sizes: {
		topNavigation: 70,
		leftNavigation: 70,
	},
};

export const themeState = proxy<ThemeState>(paperTheme);
