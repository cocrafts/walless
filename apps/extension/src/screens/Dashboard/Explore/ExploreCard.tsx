import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Image, Text, View } from '@walless/ui';

import { ExploreCard } from '.';

interface Props {
	item: ExploreCard;
}

const ChooseLayoutCard: FC<Props> = ({ item }) => {
	return (
		<View className="rounded-b-lg">
			<Link to={item.link} className="h-[133px]">
				<Image
					source={{ uri: item.thumbnailUrl }}
					className="absolute -z-10 top-0 left-0 w-full h-[133px] rounded-lg"
				/>
				<View className="absolute -z-[9] top-0 left-0 bg-gradient-to-t from-[#00223ab6] to-transparent rounded-lg h-[133px] w-full" />

				<View className="absolute top-1 right-1 flex flex-row gap-2">
					<Text className="bg-[#35A8D3] pt-[2px] px-2 rounded text-[8px] flex justify-center items-center">
						Add to my profile
					</Text>
					<Text className="h-5 w-5 bg-[#35A8D3] pt-[2px] rounded-full text-[8px] flex justify-center items-center">
						+
					</Text>
				</View>
			</Link>

			<View className="flex flex-row gap-3 relative -mt-7">
				<View className="ml-3">
					<Image
						source={{ uri: item.logoUrl }}
						className="w-[50px] h-[50px] rounded-lg"
					/>
				</View>

				<View className="flex justify-between shrink">
					<Text className="h-6 text-[8px] text-ellipsis overflow-hidden mr-3">
						{item.description}
					</Text>

					<View className="flex flex-row justify-between items-center">
						<Link to={item.link} className="text-xs font-bold">
							{item.name}
						</Link>
						<View className="flex flex-row gap-3 items-center">
							<Text className="text-[8px]">❤️ {item.loveCount} Love</Text>
							<Text className="text-[8px]">
								🟢 {item.activeUsersCount} Active
							</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default ChooseLayoutCard;
