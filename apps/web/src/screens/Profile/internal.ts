import { Networks } from '@walless/core';

import type { Collectible } from './components/Collectibles/CollectibleCard';

export interface HistoryItemProps {
	id: string;
	type: 'sent' | 'received';
	status: 'success' | 'pending' | 'failed';
	toAddress: string;
	fromAddress: string;
	amount: number;
	network: Networks;
	token: string;
	date: Date;
}

export const mockCollectibles: Collectible[] = [
	// {
	// 	id: '1',
	// 	name: 'Magic Eden',
	// 	thumbnail: '/img/profile/thumbnail-magic-eden.png',
	// 	logo: '/img/profile/logo-magic-eden.png',
	// },
	// {
	// 	id: '2',
	// 	name: 'Crypto Kitties',
	// 	thumbnail: '/img/profile/thumbnail-crypto-kitties.png',
	// 	logo: '/img/profile/logo-crypto-kitties.png',
	// },
	// {
	// 	id: '3',
	// 	name: 'Magic Eden',
	// 	thumbnail: '/img/profile/thumbnail-magic-eden.png',
	// 	logo: '/img/profile/logo-magic-eden.png',
	// },
	// {
	// 	id: '4',
	// 	name: 'Crypto Kitties',
	// 	thumbnail: '/img/profile/thumbnail-crypto-kitties.png',
	// 	logo: '/img/profile/logo-crypto-kitties.png',
	// },
];

export const mockHistory: HistoryItemProps[] = [
	{
		id: '1',
		type: 'sent',
		status: 'success',
		toAddress: 'abcd',
		fromAddress: '1234',
		amount: 1,
		network: Networks.solana,
		token: 'SOL',
		date: new Date(),
	},
	{
		id: '2',
		type: 'received',
		status: 'success',
		toAddress: '1234',
		fromAddress: 'abcd',
		amount: 1,
		network: Networks.solana,
		token: 'SOL',
		date: new Date(),
	},
];
