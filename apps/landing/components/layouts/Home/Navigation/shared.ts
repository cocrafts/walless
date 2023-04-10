export interface NavigationConfig {
	title: string;
	href: string;
}

export const navigationHeight = 64;

export const navigationItems: NavigationConfig[] = [
	{
		title: 'Getting started',
		href: '/docs/getting-started',
	},
	{
		title: 'Docs',
		href: '/docs',
	},
	{
		title: 'News',
		href: '/',
	},
	{
		title: 'Resources',
		href: '/',
	},
];
