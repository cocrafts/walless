import type { HTMLAttributeAnchorTarget } from 'react';

export interface NavigationConfig {
	title: string;
	href: string;
	target?: HTMLAttributeAnchorTarget;
}

export const navigationHeight = 64;

export const navigationItems: NavigationConfig[] = [
	{
		title: 'Getting started',
		href: 'https://stormgate.notion.site/User-Guide-09f5910b810741f9aaaa0d42b7cdc399',
		target: '_blank',
	},
	{
		title: 'For Developers',
		href: '/docs',
	},
	{
		title: 'News',
		href: '/news',
	},
	{
		title: 'Resources',
		href: '/resources',
	},
];
