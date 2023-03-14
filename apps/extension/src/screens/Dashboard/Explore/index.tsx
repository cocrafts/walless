import { FC } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Text, TextInput, View } from '@walless/ui';
import { SearchIcon } from '@walless/ui/icons';
import Solana from 'screens/ProjectLayout/Solana';
import UnderRealm from 'screens/ProjectLayout/UnderRealm';
import { resources } from 'utils/config';
import { layoutActions } from 'utils/state/layout';

import ChooseLayoutCard from './ExploreCard';

export interface ExploreCard {
	name: string;
	description: string;
	logoUrl: ImageSourcePropType;
	thumbnailUrl: ImageSourcePropType;
	loveCount: number;
	activeUsersCount: number;
	link: string;
	isInProfile: boolean;
	love: boolean;
	layoutId: string;
	component: React.FC;
	inDevelopment?: boolean;
}

const mockLayouts: ExploreCard[] = [
	{
		name: 'Under Realm',
		description:
			'Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla dapibus ornare morbi porttitor. Amet lectus volutpat nulla dapibus ornare morbi porttitor.',
		logoUrl: resources.underRealm.icon,
		thumbnailUrl: { uri: '/img/explore-screen/card-1-thumbnail.png' },
		loveCount: 10,
		activeUsersCount: 20,
		link: '/explore',
		isInProfile: true,
		love: true,
		layoutId: 'under-realm',
		component: UnderRealm,
	},
	{
		name: 'Solana',
		description:
			'Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla dapibus ornare morbi porttitor. Amet lectus volutpat nulla dapibus ornare morbi porttitor.',
		logoUrl: { uri: '/img/explore-screen/card-2-logo.png' },
		thumbnailUrl: { uri: '/img/explore-screen/card-2-thumbnail.png' },
		loveCount: 431,
		activeUsersCount: 2000,
		link: '/explore',
		isInProfile: false,
		love: false,
		layoutId: 'solana',
		component: Solana,
	},
	{
		name: 'Y00ts',
		description:
			'Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla dapibus ornare morbi porttitor. Amet lectus volutpat nulla dapibus ornare morbi porttitor.',
		logoUrl: { uri: '/img/explore-screen/card-3-logo.png' },
		thumbnailUrl: { uri: '/img/explore-screen/card-3-thumbnail.png' },
		loveCount: 59,
		activeUsersCount: 579,
		link: '/explore',
		isInProfile: true,
		love: true,
		layoutId: 'y00ts',
		component: UnderRealm,
		inDevelopment: true,
	},
	{
		name: 'Tales of berseria',
		description:
			'Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla dapibus ornare morbi porttitor. Amet lectus volutpat nulla dapibus ornare morbi porttitor.',
		logoUrl: { uri: '/img/explore-screen/card-4-logo.png' },
		thumbnailUrl: { uri: '/img/explore-screen/card-4-thumbnail.png' },
		loveCount: 36,
		activeUsersCount: 234,
		link: '/explore',
		isInProfile: false,
		love: false,
		layoutId: 'tales-of-berseria',
		component: Solana,
		inDevelopment: true,
	},
	{
		name: 'Sui',
		description:
			'Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla dapibus ornare morbi porttitor. Amet lectus volutpat nulla dapibus ornare morbi porttitor.',
		logoUrl: { uri: '/img/explore-screen/card-5-logo.png' },
		thumbnailUrl: { uri: '/img/explore-screen/card-5-thumbnail.png' },
		loveCount: 80,
		activeUsersCount: 80,
		link: '/explore',
		isInProfile: true,
		love: true,
		layoutId: 'sui',
		component: UnderRealm,
		inDevelopment: true,
	},
	{
		name: 'Nike',
		description:
			'Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla dapibus ornare morbi porttitor. Amet lectus volutpat nulla dapibus ornare morbi porttitor.',
		logoUrl: { uri: '/img/explore-screen/card-6-logo.png' },
		thumbnailUrl: { uri: '/img/explore-screen/card-6-thumbnail.png' },
		loveCount: 300,
		activeUsersCount: 900,
		link: '/explore',
		isInProfile: false,
		love: false,
		layoutId: 'nike',
		component: Solana,
		inDevelopment: true,
	},
];

export const ChooseLayout: FC = () => {
	const handleAddToProfile = (
		layoutId: string,
		name: string,
		icon: ImageSourcePropType,
		component: React.FC,
		isInProfile: boolean,
		inDevelopment?: boolean,
	) => {
		!inDevelopment &&
			!isInProfile &&
			layoutActions.addLayout(layoutId, name, icon, component);
	};

	const handleLoveProfile = (id: string, love: boolean) => {
		love ? console.log('Not love anymore', id) : console.log('Love', id);
	};

	return (
		<View className="bg-gradient-to-b from-[#003356] to-[#011726] h-full">
			<Text className="text-xl mt-10 mb-3 text-center">
				Choose a nicely layout to start
			</Text>

			<View className="bg-[#011828] h-10 mx-5 mb-6 px-4 flex flex-row items-center gap-2 rounded-lg">
				<SearchIcon size={16} color="#99B0BF" />
				<TextInput
					className="text-[#99B0BF]"
					placeholder="Explore exciting project"
				/>
			</View>

			<View className="mx-5 flex gap-5">
				{mockLayouts.map((item, index) => (
					<ChooseLayoutCard
						key={index}
						item={item}
						handlePressAddBtn={handleAddToProfile}
						handlePressLoveBtn={handleLoveProfile}
					/>
				))}
			</View>
		</View>
	);
};

export default ChooseLayout;
