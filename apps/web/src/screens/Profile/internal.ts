import { Collectible } from './components/Collectibles/CollectibleCard';
import { HistoryItemProps } from './components/History/HistoryItem';

export const mockCollectibles: Collectible[] = [
	{
		id: '1',
		name: 'Magic Eden',
		thumbnail: '/img/profile/thumbnail-magic-eden.png',
		logo: '/img/profile/logo-magic-eden.png',
	},
	{
		id: '2',
		name: 'Crypto Kitties',
		thumbnail: '/img/profile/thumbnail-crypto-kitties.png',
		logo: '/img/profile/logo-crypto-kitties.png',
	},
	{
		id: '3',
		name: 'Magic Eden',
		thumbnail: '/img/profile/thumbnail-magic-eden.png',
		logo: '/img/profile/logo-magic-eden.png',
	},
	{
		id: '4',
		name: 'Crypto Kitties',
		thumbnail: '/img/profile/thumbnail-crypto-kitties.png',
		logo: '/img/profile/logo-crypto-kitties.png',
	},
];

export const mockHistory: HistoryItemProps[] = [
	{
		id: '1',
		type: 'received',
		content: 'You have received 0.0001 ETH from 0x1234…5678',
	},
	{
		id: '2',
		type: 'sent',
		content: 'You have sent 0.0001 ETH to 0x1234…5678',
	},
];
