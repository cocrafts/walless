import { FC } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Link } from 'react-router-dom';
import { Image, Text, TouchableOpacity, View } from '@walless/ui';
import { useSnapshot } from 'utils/hook';
import { generateHash, layoutProxy } from 'utils/state/layout';

import { ExploreCard } from '.';

interface Props {
	item: ExploreCard;
	handlePressAddBtn: (
		layoutId: string,
		name: string,
		icon: ImageSourcePropType,
		component: React.FC,
		isInProfile: boolean,
	) => void;
	handlePressLoveBtn: (layoutId: string, love: boolean) => void;
}

const ChooseLayoutCard: FC<Props> = ({
	item,
	handlePressAddBtn,
	handlePressLoveBtn,
}) => {
	const layout = useSnapshot(layoutProxy);
	const isInProfile = generateHash(item.layoutId) in layout;

	return (
		<View className="rounded-b-lg">
			<View className="h-[133px]">
				<Link to={item.link}>
					<Image
						source={item.thumbnailUrl}
						className="absolute -z-10 top-0 left-0 w-full h-[133px] rounded-lg"
					/>
					<View className="absolute -z-[9] top-0 left-0 bg-gradient-to-t from-[#00223ab6] to-transparent rounded-lg h-[133px] w-full" />
				</Link>

				<TouchableOpacity
					className="group absolute top-1 right-1 flex flex-row gap-2"
					onPress={() =>
						handlePressAddBtn(
							item.layoutId,
							item.name,
							item.logoUrl,
							item.component,
							isInProfile,
						)
					}
				>
					<Text className="bg-[#35A8D3] px-2 rounded text-[8px] transition duration-200 flex justify-center items-center scale-0 group-hover:scale-100">
						{isInProfile ? 'Remove from my profile' : 'Add to my profile'}
						<View className="absolute -z-10 right-0 top-[6px] translate-x-[2px] w-2 h-2 rotate-45 rounded-[2px] bg-[#35A8D3]" />
					</Text>
					<View className="h-5 w-5 p-[1px] bg-gradient-to-b from-white to-[#2BA5D6] rounded-full">
						<Text className="h-full w-full pt-[2px] bg-gradient-to-r from-[#2BA5D6] to-[#8BC3BF] rounded-full text-sm flex justify-center items-center">
							{isInProfile ? '-' : '+'}
						</Text>
					</View>
				</TouchableOpacity>
			</View>

			<View className="flex flex-row gap-3 relative -mt-7">
				<Link to={item.link} className="ml-3">
					<Image
						source={item.logoUrl}
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
								onPress={() => handlePressLoveBtn(item.layoutId, item.love)}
							>
								{item.love ? '❤️' : '🤍'} {item.loveCount} Love
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
