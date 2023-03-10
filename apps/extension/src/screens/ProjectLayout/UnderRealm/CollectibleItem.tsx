import React from 'react';
import { Image, Text, View } from '@walless/ui';

import { NftMetadata } from './internal';

interface Props {
	nftGroup: NftMetadata[];
}

export const CollectibleItem: React.FC<Props> = ({ nftGroup }) => {
	return (
		<View className="flex-row w-[314px] ">
			{nftGroup.map((nft) => (
				<View key={nft.address} className="items-center">
					<Image
						source={nft.img}
						className="w-[157px] h-[157px] mt-2"
						resizeMode="contain"
					/>
					<Text className="text-xs mt-2">{nft.name}</Text>
					<Text className="text-xs mt-1 opacity-50">
						{nft.price} {nft.currency}
					</Text>
				</View>
			))}
		</View>
	);
};

export default CollectibleItem;
