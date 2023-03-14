import { FC } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Link } from 'react-router-dom';
import {
	ActiveDotIcon,
	CheckIcon,
	Image,
	Text,
	TouchableOpacity,
	View,
} from '@walless/ui';
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
		<View className="rounded-b-lg group/card">
			<View className={`h-[133px] ${isInProfile && 'grayscale-[80%]'}`}>
				<Link to={item.link}>
					<Image
						source={item.thumbnailUrl}
						className="absolute -z-10 top-0 left-0 w-full h-[133px] rounded-lg"
					/>
					<View
						className={`absolute -z-[9] top-0 left-0 transition duration-200 rounded-lg h-[133px] w-full bg-gradient-to-t from-[#00223ab6] to-transparent group-hover/card:from-[#23A2D7]/80 group-hover/card:via-[#23A2D7]/20 group-hover/card:to-[#FFFFFF00] outline outline-1 outline-transparent group-hover/card:outline-white/50 ${
							isInProfile &&
							'bg-gradient-to-t from-[#1A1A1A00] to-[#4e4e4e00] group-hover/card:bg-gradient-to-t group-hover/card:from-[#1A1A1A] group-hover/card:via-[#1A1A1A00] group-hover/card:to-[#4e4e4e00]'
						}`}
					/>
				</Link>

				<View className="absolute top-1 right-1 flex flex-row-reverse gap-2">
					<TouchableOpacity
						onPress={() =>
							handlePressAddBtn(
								item.layoutId,
								item.name,
								item.logoUrl,
								item.component,
								isInProfile,
							)
						}
						className="h-5 w-5 p-[1px] bg-gradient-to-b from-white to-[#2BA5D6] rounded-full peer"
					>
						<Text
							className={`h-full w-full pt-[2px] rounded-full text-sm flex justify-center items-center ${
								isInProfile
									? 'bg-[#1C1B1B]'
									: 'bg-gradient-to-r from-[#2BA5D6] to-[#8BC3BF]'
							}`}
						>
							{isInProfile ? <CheckIcon size={7} color="white" /> : '+'}
						</Text>
					</TouchableOpacity>

					<Text
						className={`relative px-2 rounded text-[8px] transition duration-200 flex justify-center items-center invisible peer-hover:visible ${
							isInProfile ? 'bg-[#1C1B1B] text-white' : 'bg-[#35A8D3]'
						}`}
					>
						{isInProfile ? 'Added to my profile' : 'Add to my profile'}
						<View
							className={`absolute -z-10 right-0 top-[6px] transition duration-200 translate-x-[2px] w-2 h-2 rotate-45 rounded-[2px] ${
								isInProfile ? 'bg-[#1C1B1B]' : 'bg-[#35A8D3]'
							}`}
						/>
					</Text>
				</View>
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
								{item.love ? '❤️' : '🤍'} {item.loveCount}
							</Text>
							<Text className="flex flex-row gap-1 items-center justify-center">
								<ActiveDotIcon size={5} color="#4DE2A4" className="mb-[1px]" />{' '}
								<Text className="text-[8px]">
									{item.activeUsersCount} Active
								</Text>
							</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default ChooseLayoutCard;
