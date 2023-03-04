import React from 'react';
import {
	ChevronDownIcon,
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
	icon: React.ReactNode;
	onPress: () => void;
}

const Profile: React.FC = () => {
	const [isBalanceVisible, setIsBalanceVisible] = React.useState(false);
	const [currency, setCurrency] = React.useState('USD');
	const [tokenValue, setTokenValue] = React.useState('200');

	const handleChangeCurrency = () => {
		setCurrency(currency === 'USD' ? 'VND' : 'USD');
		setTokenValue(currency === 'USD' ? '4,500,000' : '200');
	};

	return (
		<View className="bg-gradient-to-b from-[#003356] to-[#011726] h-full">
			<WallessBanner className="py-8 mb-5">
				<View className="px-4 mb-2 flex flex-row justify-between items-start">
					<Text className="flex flex-row gap-2 items-center text-xs text-color-7">
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
						{isBalanceVisible ? <Text>~ {tokenValue}</Text> : '...'}
						<Text className="text-base ml-[2px] mr-1"> {currency}</Text>

						<TouchableOpacity
							onPress={handleChangeCurrency}
							className="bg-[#80D0DC] mt-1 h-4 w-4 flex justify-center items-center rounded-full"
						>
							<ChevronDownIcon size={12} color="white" className="mt-[2px]" />
						</TouchableOpacity>
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
