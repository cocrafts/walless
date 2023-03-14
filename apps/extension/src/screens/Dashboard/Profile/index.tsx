import { FC, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	ChevronRightIcon,
	EyeOffIcon,
	EyeOnIcon,
	Text,
	TouchableOpacity,
	View,
} from '@walless/ui';

import Features from './Features';
import FloatingUtilities from './FloatingUtilities';
import NFTCollectibles from './NFTCollectibles';
import WallessBanner from './WallessBanner';

export interface FeatureButtonProps {
	title: string;
	icon: ReactNode;
	onPress: () => void;
}

const Profile: FC = () => {
	const [isBalanceVisible, setIsBalanceVisible] = useState(false);

	return (
		<View className="bg-gradient-to-b from-[#003356] to-[#011726] h-full">
			<WallessBanner className="py-8 mb-5">
				<View className="px-4 mb-2 flex flex-row justify-between items-start">
					<Text className="flex flex-row gap-2 items-center text-xs text-white/50">
						Token value
						<TouchableOpacity
							onPress={() => setIsBalanceVisible((prev) => !prev)}
						>
							{isBalanceVisible ? (
								<EyeOnIcon color="#FFFFFF80" size={16} />
							) : (
								<EyeOffIcon color="#FFFFFF80" size={16} />
							)}
						</TouchableOpacity>
					</Text>
					<FloatingUtilities />
				</View>

				<View className="mb-8 px-4">
					<Text className="flex flex-row text-4xl text-color-7 font-bold">
						{isBalanceVisible ? (
							<Text className="flex flex-row justify-start">
								~ 18 <Text className="text-base">ETH</Text>
							</Text>
						) : (
							'...'
						)}

						<Link
							to="/profile"
							className="bg-[#80D0DC] mt-1 ml-2 h-4 w-4 flex justify-center items-center rounded-full"
						>
							<ChevronRightIcon size={12} color="white" />
						</Link>
					</Text>
				</View>

				<View className="mx-5 relative">
					<Features className="absolute w-full rounded-lg" />
				</View>
			</WallessBanner>

			<NFTCollectibles className="mt-5 mx-5" />
		</View>
	);
};

export default Profile;
