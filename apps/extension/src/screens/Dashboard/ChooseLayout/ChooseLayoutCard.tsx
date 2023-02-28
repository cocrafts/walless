import { FC } from 'react';
import { Image, Text, View } from '@walless/ui';
import { resources } from 'utils/config';

import { WalletLayout } from '.';

interface Props {
	item: WalletLayout;
}

const ChooseLayoutCard: FC<Props> = ({ item }) => {
	return (
		<View className="bg-[#f4f4f4] w-full rounded-b">
			<View className="h-16 bg-light-gray rounded-t">
				<Image source={{ uri: item.thumbnailUrl }} />
				<View className="absolute bottom-0 left-4 flex flex-row gap-2 items-center">
					<View className="bg-color-2 w-7 h-7 rounded-sm border-gray border">
						<Image source={{ uri: item.logoUrl }} />
					</View>
					<Text className="text-xs font-bold">{item.name}</Text>
				</View>

				<View className="h-7 absolute bottom-0 right-4 flex flex-row gap-2 items-center">
					{item.loveCount && item.loveCount > 0 && (
						<Text className="text-xs">💙 {item.loveCount}</Text>
					)}
					{item.activeUserCount && item.activeUserCount > 0 && (
						<Text className="text-xs">👥 {item.activeUserCount}</Text>
					)}
				</View>
			</View>

			<View className="px-4 py-2">
				<Text className="text-xs text-color-7">{item.description}</Text>
			</View>
		</View>
	);
};

export default ChooseLayoutCard;
