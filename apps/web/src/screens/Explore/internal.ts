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
		id: '1',
		name: 'Under Realm',
		description:
			'Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla dapibus ornare ...',
		thumbnail: '/img/explore/thumbnail-under-realm.png',
		logo: '/img/explore/logo-under-realm.png',
		loveCount: 100,
		isLoved: true,
		activeUsers: 100,
	},
	{
		id: '2',
		name: 'Solana',
		description:
			'Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla dapibus ornare ...',
		thumbnail: '/img/explore/thumbnail-solana.png',
		logo: '/img/explore/logo-solana.png',
		loveCount: 100,
		isLoved: false,
		activeUsers: 100,
	},
	{
		id: '3',
		name: 'Sui',
		description:
			'Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla dapibus ornare ...',
		thumbnail: '/img/explore/thumbnail-sui.png',
		logo: '/img/explore/logo-sui.png',
		loveCount: 100,
		isLoved: false,
		activeUsers: 100,
	},
];
