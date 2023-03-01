import { FC } from 'react';
import { ImageBackground } from 'react-native';
import { Image, Text, View } from '@walless/ui';

import { WalletLayout } from '.';

interface Props {
	item: WalletLayout;
}

const ChooseLayoutCard: FC<Props> = ({ item }) => {
	return (
		<View className="bg-[#f4f4f4] w-full rounded-b">
			<ImageBackground
				source={{ uri: item.thumbnailUrl }}
				style={{ width: 320, height: 64 }}
				className="h-16 bg-light-gray rounded-t"
			>
				<View className="absolute bottom-0 left-4 flex flex-row gap-2 items-center">
					<Image
						source={{ uri: item.logoUrl }}
						style={{
							width: 28,
							height: 28,
							borderRadius: 4,
							borderColor: '#E8E8E8',
							borderWidth: 1,
							resizeMode: 'cover',
						}}
					/>
					<Text className="text-xs font-bold">{item.name}</Text>
				</View>

				<View className="h-7 absolute bottom-0 right-4 flex flex-row gap-2 items-center">
					{item.loveCount > 0 && (
						<Text className="text-xs">💙 {item.loveCount}</Text>
					)}
					{item.activeUserCount > 0 && (
						<Text className="text-xs">👥 {item.activeUserCount}</Text>
					)}
				</View>
			</ImageBackground>

			<View className="px-4 py-2">
				<Text className="text-xs text-color-7">{item.description}</Text>
			</View>
		</View>
	);
};

export default ChooseLayoutCard;
