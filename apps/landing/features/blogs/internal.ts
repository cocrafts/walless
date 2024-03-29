export interface Blog {
	id: string;
	title: string;
	coverImage: string;
	description: string;
	date: Date;
	category: Category;
	content: string[][];
	activityImages: string[];
}

export enum Category {
	all = 'All',
	news = 'News',
	technical = 'Technical',
	develop = 'Develop',
	product = 'Product',
}

export interface Query {
	category: Category;
}

export const blogs: Blog[] = [
	{
		id: '1',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Technical blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.technical,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '2',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Technical blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.technical,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '3',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Technical blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.technical,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '4',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Technical blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.technical,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '5',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Technical blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.technical,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '6',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Technical blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.technical,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '7',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Technical blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.technical,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '8',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Technical blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.technical,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '9',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Technical blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.technical,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '10',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Develop blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.develop,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},

	{
		id: '11',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Develop blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.develop,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '12',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Develop blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.develop,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '13',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Develop blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.develop,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '14',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Develop blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.develop,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '15',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Develop blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.develop,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '16',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Develop blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.develop,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '17',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Develop blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.develop,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '18',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Develop blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.develop,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '19',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Develop blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.develop,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '20',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Develop blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.develop,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '21',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a News blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.news,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '22',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a News blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.news,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '23',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a News blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.news,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '24',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a News blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.news,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '25',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a News blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.news,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '26',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a News blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.news,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '27',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a News blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.news,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '28',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a News blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.news,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '29',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a News blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.news,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '30',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a News blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.news,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},

	{
		id: '31',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Product blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.product,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '32',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Product blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.product,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '33',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Product blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.product,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '34',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Product blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.product,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '35',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Product blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.product,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '36',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Product blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.product,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '37',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Product blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.product,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '38',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Product blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.product,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '39',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Product blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.product,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
	{
		id: '40',
		title: 'How to create a blog',
		coverImage: '/img/blogs/tezos-walless.svg',
		description:
			'This is a blog about how to create a Product blog. Below is a spectrum of video providers loosely grouped by the types of services they offer. As you go right, you shift toward DIY and video that’s built into the app directly (also known as native video, but we’ll steer clear of that term to avoid confusion with native application development)....',
		date: new Date(),
		category: Category.product,
		content: [
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
			[
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
				' The work included the dismantling of 1.5 m wide facade type “PERI” scaffolding, with 0.5 m brackets, as well as other accessories such as lifts, weirs, and the like.',
				'Munich, Germany At the beginning of November, in the center of Munich, a corner of the scaffolding on an antique building from 1897 built-in neo-baroque style. It is still an official building, serving as a ministry. Our 5 colleagues worked on this section and the work lasted 2 weeks.',
			],
		],
		activityImages: [
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
			'/img/blogs/tezos-walless.svg',
		],
	},
];
