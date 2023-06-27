export interface LayoutCardProps {
	id: string;
	coverImage: string;
	logoImage: string;
	title: string;
	description: string;
	loveCount: number;
	activeCount: number;
	activeLayoutId?: string | null;
	setIsActiveId?: (id: string | null) => void;
}

export const defiList: LayoutCardProps[] = [
	{
		id: 'defi-1',
		coverImage: '/img/layouts/defi/cover/valorant.png',
		logoImage: '/img/layouts/defi/logo/valorant.png',
		title: 'Valorant',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		loveCount: 0,
		activeCount: 0,
	},
	{
		id: 'defi-2',
		coverImage: '/img/layouts/defi/cover/sui.png',
		logoImage: '/img/layouts/defi/logo/sui.png',
		title: 'Sui',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		loveCount: 0,
		activeCount: 0,
	},
	{
		id: 'defi-3',
		coverImage: '/img/layouts/defi/cover/solana.png',
		logoImage: '/img/layouts/defi/logo/solana.png',
		title: 'Solana',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		loveCount: 0,
		activeCount: 0,
	},
	{
		id: 'defi-4',
		coverImage: '/img/layouts/defi/cover/fortnite.png',
		logoImage: '/img/layouts/defi/logo/sui.png',
		title: 'Fortnite',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		loveCount: 0,
		activeCount: 0,
	},
];

export const gamesList: LayoutCardProps[] = [
	{
		id: 'game-1',
		coverImage: '/img/layouts/games/cover/valorant.png',
		logoImage: '/img/layouts/games/logo/valorant.png',
		title: 'Valorant',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		loveCount: 0,
		activeCount: 0,
	},
	{
		id: 'game-2',
		coverImage: '/img/layouts/games/cover/magic-eden.png',
		logoImage: '/img/layouts/games/logo/magic-eden.png',
		title: 'Magic Eden',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		loveCount: 0,
		activeCount: 0,
	},
	{
		id: 'game-3',
		coverImage: '/img/layouts/games/cover/nike.png',
		logoImage: '/img/layouts/games/logo/nike.png',
		title: 'Nike',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		loveCount: 0,
		activeCount: 0,
	},
	{
		id: 'game-4',
		coverImage: '/img/layouts/games/cover/adidas.png',
		logoImage: '/img/layouts/games/logo/adidas.png',
		title: 'Adidas',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		loveCount: 0,
		activeCount: 0,
	},
];
