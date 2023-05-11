import { TabAble } from '@walless/app';
import { MetadataDocument } from '@walless/store';

import EmptyTab from './EmptyTab';

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

export const mockMetadata: MetadataDocument = {
	_id: '111111111111111111',
	type: 'Metadata',
	name: 'Solana',
	symbol: 'SOL',
	imageUri: '/img/network/solana-icon-lg.png',
};
