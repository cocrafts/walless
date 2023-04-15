export interface Layout {
	id: string;
	name: string;
	description: string;
	thumbnail: string;
	logo: string;
	loveCount: number;
	isLoved: boolean;
	activeUsers: number;
}

export interface LayoutCardProps {
	item: Layout;
	onAddPress?: (item: Layout) => void;
	onLovePress?: (item: Layout) => void;
}

export const mockLayoutCards: Layout[] = [
	{
		id: '0',
		name: 'Sui',
		description:
			'Layer 1 blockchain designed to make digital asset ownership fast, private, secure, and accessible to everyone.',
		thumbnail: '/img/explore/thumbnail-sui.png',
		logo: '/img/explore/logo-sui.png',
		loveCount: 100,
		isLoved: false,
		activeUsers: 100,
	},
	{
		id: '1',
		name: 'Solana',
		description: 'Powerful for developers. Fast for everyone.',
		thumbnail: '/img/explore/thumbnail-solana.png',
		logo: '/img/explore/logo-solana.png',
		loveCount: 100,
		isLoved: false,
		activeUsers: 100,
	},
	{
		id: '2',
		name: 'Under Realm',
		description: 'Free-to-play Strategy Trading Card game built by community.',
		thumbnail: '/img/explore/thumbnail-under-realm.png',
		logo: '/img/explore/logo-under-realm.png',
		loveCount: 100,
		isLoved: true,
		activeUsers: 100,
	},
];
