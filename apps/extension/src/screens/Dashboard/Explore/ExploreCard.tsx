import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Image, Text, TouchableOpacity, View } from '@walless/ui';

import { ExploreCard } from '.';

interface Props {
	item: ExploreCard;
	handlePressAddBtn: (id: string, isInProfile: boolean) => void;
	handlePressLoveBtn: (id: string, love: boolean) => void;
}

const ChooseLayoutCard: FC<Props> = ({
	item,
	handlePressAddBtn,
	handlePressLoveBtn,
}) => {
	return (
		<View className="rounded-b-lg">
			<View className="h-[133px]">
				<Link to={item.link}>
					<Image
						source={{ uri: item.thumbnailUrl }}
						className="absolute -z-10 top-0 left-0 w-full h-[133px] rounded-lg"
					/>
					<View className="absolute -z-[9] top-0 left-0 bg-gradient-to-t from-[#00223ab6] to-transparent rounded-lg h-[133px] w-full" />
				</Link>

				<TouchableOpacity
					className="group absolute top-1 right-1 flex flex-row gap-2"
					onPress={() => handlePressAddBtn(item.id, item.isInProfile)}
				>
					<Text className="bg-[#35A8D3] pt-[2px] px-2 rounded text-[8px] transition duration-200 flex justify-center items-center scale-0 group-hover:scale-100">
						{item.isInProfile ? 'Remove from my profile' : 'Add to my profile'}
					</Text>
					<Text className="h-5 w-5 bg-gradient-to-r from-[#2BA5D6] to-[#8BC3BF] pt-[2px] rounded-full text-sm flex justify-center items-center">
						{item.isInProfile ? '-' : '+'}
					</Text>
				</TouchableOpacity>
			</View>

			<View className="flex flex-row gap-3 relative -mt-7">
				<Link to={item.link} className="ml-3">
					<Image
						source={{ uri: item.logoUrl }}
						className="w-[50px] h-[50px] rounded-lg"
					/>
				</Link>

				<View className="flex justify-between shrink">
					<Text className="h-6 text-[8px] text-ellipsis overflow-hidden mr-3">
						{item.description}
					</Text>

					<View className="flex flex-row justify-between items-center">
						<Link to={item.link} className="text-xs font-bold">
							{item.name}
						</Link>
						<View className="flex flex-row gap-3 items-center">
							<Text
								className="text-[8px]"
								onPress={() => handlePressLoveBtn(item.id, item.love)}
							>
								{item.love ? '❤️' : '🤍'}
								{item.loveCount} Love
							</Text>
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
