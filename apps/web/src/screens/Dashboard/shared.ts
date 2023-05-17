import { type TabAble } from '@walless/app';
import { type SlideOption } from '@walless/gui';

import EmptyTab from './EmptyTab';
import TokenTab from './TokenTab';

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

export const bottomSliderItems: SlideOption[] = [
	{
		id: 'tokens',
		component: TokenTab,
	},
	{
		id: 'collectibles',
		component: EmptyTab,
	},
	{
		id: 'activities',
		component: EmptyTab,
	},
];
