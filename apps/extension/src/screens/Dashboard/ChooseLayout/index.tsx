import { FC } from 'react';
import { TextInput } from 'react-native';
import { Text, View } from '@walless/ui';
import IconSearch from '@walless/ui/components/IconSearch';

import ChooseLayoutCard from './ChooseLayoutCard';

export interface WalletLayout {
	name: string;
	description: string;
	logoUrl: string;
	thumbnailUrl: string;
	loveCount: number;
	activeUserCount: number;
}

const mockLayouts: WalletLayout[] = [
	{
		name: 'Solana',
		description:
			'Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla dapibus ornare morbi porttitor. Amet lectus volutpat nulla dapibus ornare morbi porttitor.',
		logoUrl: 'https://cdn.worldvectorlogo.com/logos/solana-1.svg',
		thumbnailUrl: 'https://cdn.worldvectorlogo.com/logos/solana-1.svg',
		loveCount: 10,
		activeUserCount: 20,
	},
	{
		name: 'Solana',
		description:
			'Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla dapibus ornare morbi porttitor. Amet lectus volutpat nulla dapibus ornare morbi porttitor.',
		logoUrl: 'https://cdn.worldvectorlogo.com/logos/solana-1.svg',
		thumbnailUrl: 'https://cdn.worldvectorlogo.com/logos/solana-1.svg',
		loveCount: 12,
		activeUserCount: 2,
	},
];

export const ChooseLayout: FC = () => {
	return (
		<View className="bg-white h-full flex gap-4">
			<View className="bg-[#1072B7] h-[150px] flex justify-center items-center rounded-b-lg">
				<View>
					<Text className="text-xl mb-4">Choose a nicely layout to start</Text>
					<View className="bg-[#E9E9E9] h-10 px-4 flex flex-row items-center gap-2">
						<IconSearch size={16} color="#00000080" />
						<TextInput placeholder="Explore exciting project" />
					</View>
				</View>
			</View>

			<View className="w-[320px] mx-auto flex gap-2">
				{mockLayouts.map((item, index) => (
					<ChooseLayoutCard key={index} item={item} />
				))}
			</View>
		</View>
	);
};

export default ChooseLayout;
