import { FC } from 'react';
import { Text, TextInput, View } from '@walless/ui';
import { SearchIcon } from '@walless/ui/icons';

import ChooseLayoutCard from './ExploreCard';

export interface ExploreCard {
	name: string;
	description: string;
	logoUrl: string;
	thumbnailUrl: string;
	loveCount: number;
	activeUsersCount: number;
	link: string;
}

const mockLayouts: ExploreCard[] = [
	{
		name: 'Under Realm',
		description:
			'Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla dapibus ornare morbi porttitor. Amet lectus volutpat nulla dapibus ornare morbi porttitor.',
		logoUrl: '/img/explore-screen/card-1-logo.png',
		thumbnailUrl: '/img/explore-screen/card-1-thumbnail.png',
		loveCount: 10,
		activeUsersCount: 20,
		link: '/explore',
	},
	{
		name: 'Solana',
		description:
			'Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla dapibus ornare morbi porttitor. Amet lectus volutpat nulla dapibus ornare morbi porttitor.',
		logoUrl: '/img/explore-screen/card-2-logo.png',
		thumbnailUrl: '/img/explore-screen/card-2-thumbnail.png',
		loveCount: 1,
		activeUsersCount: 2,
		link: '/explore',
	},
];

export const ChooseLayout: FC = () => {
	return (
		<View className="bg-gradient-to-b from-[#003356] to-[#011726] h-full">
			<Text className="text-xl mt-10 mb-3 text-center">
				Choose a nicely layout to start
			</Text>

			<View className="bg-[#011828] h-10 mx-5 mb-6 px-4 flex flex-row items-center gap-2">
				<SearchIcon size={16} color="#99B0BF" />
				<TextInput
					className="text-[#99B0BF]"
					placeholder="Explore exciting project"
				/>
			</View>

			<View className="mx-5 flex gap-5">
				{mockLayouts.map((item, index) => (
					<ChooseLayoutCard key={index} item={item} />
				))}
			</View>
		</View>
	);
};

export default ChooseLayout;
