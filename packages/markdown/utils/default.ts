import type { MarkdownConfig, ThemeColors } from './types';

export const defaultColors: ThemeColors = {
	primary: '#2C879B',
	secondary: '#EB5757',
	background: '#002E46',
	card: '#FFFFFF',
	border: '#D8D8D8',
	notification: '#FF3B30',
	text: '#F0F0F0',
	link: '#2C879B',
	alt: '#FFFFFF',
	altText: '#222222',
};

export const defaultConfigs: Omit<MarkdownConfig, 'layout'> = {
	headingFamily: 'Roboto Slab',
	fontFamily: 'Roboto',
	fontWeight: '400',
	fontSize: 16,
	lineHeight: 20,
	dark: false,
	colors: defaultColors,
};
