import type { Collectible, Token } from '@walless/core';
import type { Networks } from '@walless/core';

export interface HistoryItemProps {
	id: string;
	type: 'sent' | 'received';
	status: 'success' | 'pending' | 'failed';
	toAddress: string;
	fromAddress: string;
	amount: number;
	network: Networks;
	token: Omit<Token, 'account'> | Omit<Collectible, 'account'>;
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
