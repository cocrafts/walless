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
	onPressLoveBtn: (layout: Layout) => void;
}

export const mockLayoutCards: Layout[] = [
	{
		id: '1',
		name: 'Magic Eden',
		description:
			'Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla dapibus ornare ...',
		thumbnail: '/img/explore/thumbnail-magic-eden.png',
		logo: '/img/explore/logo-magic-eden.png',
		loveCount: 100,
		isLoved: true,
		activeUsers: 100,
	},
	{
		id: '2',
		name: 'Axie',
		description:
			'Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla dapibus ornare ...',
		thumbnail: '/img/explore/thumbnail-axie.png',
		logo: '/img/explore/logo-axie.png',
		loveCount: 100,
		isLoved: false,
		activeUsers: 100,
	},
];
