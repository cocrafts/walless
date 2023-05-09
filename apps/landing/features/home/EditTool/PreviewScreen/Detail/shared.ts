import { FC } from 'react';

import EmptyTab from './EmptyTab';

export interface TabAble {
	id: string;
	title: string;
	component?: FC;
}

export const layoutTabs: TabAble[] = [
	{
		id: 'tokens',
		title: 'Tokens',
		component: EmptyTab,
	},
	{
		id: 'collectibles',
		title: 'Collectibles',
		component: EmptyTab,
	},
	{
		id: 'activities',
		title: 'Activities',
		component: EmptyTab,
	},
];
