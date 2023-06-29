import { type CommentProps } from './LayoutDetails/components/DetailTabs/CommentsTab';
import { type InfoProps } from './LayoutDetails/components/DetailTabs/InformationTab';

export interface LayoutProps {
	id: string;
	coverImage: string;
	logoImage: string;
	title: string;
	description: string;
	loveCount: number;
	activeCount: number;
	screenshots?: string[];
	information?: InfoProps;
	comments?: CommentProps[];
}

export const defiList: LayoutProps[] = [
	{
		id: 'defi-1',
		coverImage: '/img/layouts/defi/cover/valorant.svg',
		logoImage: '/img/layouts/defi/logo/valorant.svg',
		title: 'Valorant',
		description:
			'Get exclusive crypto-native deals, giveaways, discounts, whitelists, and more in Backpack powered by the AssetDash xNFT.',
		loveCount: 0,
		activeCount: 0,
		screenshots: [
			'/img/layouts/defi/screenshots/valorant1.svg',
			'/img/layouts/defi/screenshots/valorant2.svg',
			'/img/layouts/defi/screenshots/valorant3.svg',
		],
		information: {
			website: '73rBGJKygfUzuK9gUkkQrFXNg88VgHojeUogYR4yuvHu',
			category: '73rBGJKygfUzuK9gUkkQrFXNg88VgHojeUogYR4yuvHu',
			lastUpdate: '73rBGJKygfUzuK9gUkkQrFXNg88VgHojeUogYR4yuvHu',
		},
		comments: [
			{
				user: {
					id: 'user-1',
					name: 'John Doe',
					profileImage: '/img/layouts/defi/logo/valorant.svg',
					email: 'nth',
				},
				comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			},
		],
	},
	{
		id: 'defi-2',
		coverImage: '/img/layouts/defi/cover/sui.svg',
		logoImage: '/img/layouts/defi/logo/sui.svg',
		title: 'Sui',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		loveCount: 0,
		activeCount: 0,
	},
	{
		id: 'defi-3',
		coverImage: '/img/layouts/defi/cover/solana.svg',
		logoImage: '/img/layouts/defi/logo/solana.svg',
		title: 'Solana',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		loveCount: 0,
		activeCount: 0,
	},
	{
		id: 'defi-4',
		coverImage: '/img/layouts/defi/cover/fortnite.svg',
		logoImage: '/img/layouts/defi/logo/sui.svg',
		title: 'Fortnite',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		loveCount: 0,
		activeCount: 0,
	},
];

export const gamesList: LayoutProps[] = [
	{
		id: 'game-1',
		coverImage: '/img/layouts/games/cover/valorant.svg',
		logoImage: '/img/layouts/games/logo/valorant.svg',
		title: 'Valorant',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		loveCount: 0,
		activeCount: 0,
	},
	{
		id: 'game-2',
		coverImage: '/img/layouts/games/cover/magic-eden.svg',
		logoImage: '/img/layouts/games/logo/magic-eden.svg',
		title: 'Magic Eden',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		loveCount: 0,
		activeCount: 0,
	},
	{
		id: 'game-3',
		coverImage: '/img/layouts/games/cover/nike.svg',
		logoImage: '/img/layouts/games/logo/nike.svg',
		title: 'Nike',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		loveCount: 0,
		activeCount: 0,
	},
	{
		id: 'game-4',
		coverImage: '/img/layouts/games/cover/adidas.svg',
		logoImage: '/img/layouts/games/logo/adidas.svg',
		title: 'Adidas',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		loveCount: 0,
		activeCount: 0,
	},
];
