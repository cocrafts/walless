import React from 'react';
import {
	ArrowBottomRightIcon,
	ArrowTopRightIcon,
	EyeOnIcon,
	ImageBackground,
	SwapIcon,
	Text,
	TouchableOpacity,
	View,
} from '@walless/ui';
import { resources } from 'utils/config';

export const WalletCard: React.FC = () => {
	return (
		<ImageBackground
			source={resources.solana.walletCardBg}
			className="w-[328px] mx-4 rounded-lg overflow-hidden py-3 px-4"
		>
			<Text className="[color:#587A90] text-xs font-medium">
				Wallet #1: kiou252384wehf89234
			</Text>
			<View className="my-3">
				<View className="flex-row items-center">
					<Text className="mr-4 [color:#000000] text-3xl font-semibold">
						420 SOL
					</Text>
					<TouchableOpacity className="w-5 aspect-square justify-center items-center">
						<EyeOnIcon />
					</TouchableOpacity>
				</View>
				<Text className="[color:#587A90] text-xs">~ 2890 USD</Text>
			</View>
			<View className="flex-row justify-between">
				<TouchableOpacity className="w-[93px] bg-[color:#1075AE] flex-row p-1 rounded-lg items-center">
					<View className="w-[22px] aspect-square items-center justify-center">
						<View className="absolute top-0 bottom-0 left-0 right-0 bg-white opacity-20 rounded-md" />
						<ArrowTopRightIcon color="#ffffff" />
					</View>
					<Text className="flex-1 text-center text-xs font-medium">Send</Text>
				</TouchableOpacity>
				<TouchableOpacity className="w-[93px] bg-[color:#1075AE] flex-row p-1 rounded-lg items-center">
					<View className="w-[22px] aspect-square items-center justify-center ">
						<View className="absolute top-0 bottom-0 left-0 right-0 bg-white opacity-20 rounded-md" />
						<ArrowBottomRightIcon color="#ffffff" />
					</View>
					<Text className="flex-1 text-center text-xs font-medium">
						Receive
					</Text>
				</TouchableOpacity>
				<TouchableOpacity className="w-[93px] bg-[color:#1075AE] flex-row p-1 rounded-lg items-center">
					<View className="w-[22px] aspect-square items-center justify-center">
						<View className="absolute top-0 bottom-0 left-0 right-0 bg-white opacity-20 rounded-md" />
						<SwapIcon color="#ffffff" />
					</View>
					<Text className="flex-1 text-center text-xs font-medium">Swap</Text>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
};

export default WalletCard;
