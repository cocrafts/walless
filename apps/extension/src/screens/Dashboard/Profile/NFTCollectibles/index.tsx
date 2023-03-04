import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Text, View } from '@walless/ui';

import CollectiblesCarousel from './CollectiblesCarousel';

interface NFTCollectiblesProps {
	className?: string;
}

export interface CollectibleProps {
	name: string;
	icon: string;
	thumbnail: string;
	link: string;
}

const mockCollectibles: CollectibleProps[] = [
	{
		name: 'Axie',
		icon: '/img/profile-screen/collectibles/axie-icon.png',
		thumbnail: '/img/profile-screen/collectibles/axie-thumbnail.png',
		link: '/profile',
	},
	{
		name: 'Crypto Kitties',
		icon: '/img/profile-screen/collectibles/crypto-kitties-icon.png',
		thumbnail: '/img/profile-screen/collectibles/crypto-kitties-thumbnail.png',
		link: '/profile',
	},
	{
		name: 'Under Realm',
		icon: '/img/profile-screen/collectibles/under-realm-icon.png',
		thumbnail: '/img/profile-screen/collectibles/under-realm-thumbnail.png',
		link: '/profile',
	},
	{
		name: 'Magic Eden',
		icon: '/img/profile-screen/collectibles/magic-eden-icon.png',
		thumbnail: '/img/profile-screen/collectibles/magic-eden-thumbnail.png',
		link: '/profile',
	},
];

const NFTCollectibles: FC<NFTCollectiblesProps> = ({ className }) => {
	const navigate = useNavigate();
	const [collectibles, setCollectibles] =
		useState<CollectibleProps[]>(mockCollectibles);

	return (
		<View className={className}>
			<View className="flex flex-row justify-between items-center mb-4">
				<Text className="text-sm">
					NFT Collectibles ({collectibles.length})
				</Text>
				<Button
					className="border border-[#203C4E] rounded px-2 py-1"
					title="See all"
					titleClass="text-xs"
					onPress={() => navigate('/profile')}
				/>
			</View>

			<CollectiblesCarousel collectibles={collectibles} />
		</View>
	);
};

export default NFTCollectibles;
