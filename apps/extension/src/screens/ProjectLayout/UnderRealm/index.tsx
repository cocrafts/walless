import React, { useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { Image, Text, View } from '@walless/ui';
import { resources } from 'utils/config';

import Indicator from '../components/Indicator';

import CollectibleItem from './CollectibleItem';
import { NftMetadata, nfts, tokens } from './internal';
import TokenCard from './TokenCard';

const collectibles: NftMetadata[][] = [];
const cloneNfts = [...nfts];
while (cloneNfts.length) {
	collectibles.push(cloneNfts.splice(0, 2));
}

export const UnderRealm: React.FC = () => {
	const [tokenActiveIndex, setTokenActiveIndex] = useState(0);
	const [nftActiveIndex, setNftActiveIndex] = useState(0);
	const tokenScrollRef = useRef<ScrollView>(null);
	const nftScrollRef = useRef<ScrollView>(null);
	const tokenValueX = 316;
	const nftValueX = 314;

	const onTokenScrollPress = (index: number) => {
		tokenScrollRef.current?.scrollTo({ x: index * tokenValueX });
		setTokenActiveIndex(index);
	};

	const onNftScrollPress = (index: number) => {
		nftScrollRef.current?.scrollTo({ x: index * nftValueX });
		setNftActiveIndex(index);
	};

	return (
		<View className="flex-1 bg-[color:#110A07]">
			<Image
				source={resources.underRealm.banner}
				className="w-full aspect-[358/117] mb-5"
			/>
			<View>
				<ScrollView
					horizontal
					scrollEnabled={false}
					ref={tokenScrollRef}
					style={{ flexDirection: 'row' }}
				>
					{tokens.map((token) => (
						<TokenCard key={token.address} token={token} />
					))}
				</ScrollView>
			</View>
			<View className="flex-row justify-center mt-2">
				{tokens.map((token, index) => {
					const isActive = index === tokenActiveIndex;

					return (
						<Indicator
							key={token.address}
							isActive={isActive}
							index={index}
							onScrollPress={onTokenScrollPress}
						/>
					);
				})}
			</View>
			<View className="mt-4 mx-4">
				<View className="flex-row justify-between items-end">
					<Text className="font-bold">Collectibles (10)</Text>
					<Text className="text-xs opacity-50">See all</Text>
				</View>
				<ScrollView
					horizontal
					ref={nftScrollRef}
					scrollEnabled={false}
					style={{ flexDirection: 'row' }}
				>
					{collectibles.map((nftGroup, index) => (
						<CollectibleItem key={index} nftGroup={nftGroup} />
					))}
				</ScrollView>
				<View className="flex-row justify-center mt-2">
					{collectibles.map((nftGroup, index) => {
						const isActive = index === nftActiveIndex;

						return (
							<Indicator
								key={index}
								isActive={isActive}
								index={index}
								onScrollPress={onNftScrollPress}
							/>
						);
					})}
				</View>
			</View>
		</View>
	);
};

export default UnderRealm;
