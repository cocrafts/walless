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
		href: '/',
		target: '_blank',
	},
	{
		title: 'For Developers',
		href: '/docs',
	},
	{
		title: 'Blogs',
		href: '/blogs',
	},
	{
		title: 'About us',
		href: '/aboutUs',
	},
	{
		title: 'Resources',
		href: '/resources',
	},
];
