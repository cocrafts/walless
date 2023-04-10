import type { MarkdownConfig, ThemeColors } from './types';

export const defaultColors: ThemeColors = {
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
};

export const defaultConfigs: Omit<MarkdownConfig, 'layout'> = {
	fontFamily: 'Rubik',
	fontWeight: '400',
	fontSize: 15,
	lineHeight: 20,
	dark: false,
	colors: defaultColors,
};
