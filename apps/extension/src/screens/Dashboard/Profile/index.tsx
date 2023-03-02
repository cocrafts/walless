import React from 'react';
import {
	ChevronDownIcon,
	EyeOffIcon,
	EyeOnIcon,
	Text,
	View,
} from '@walless/ui';

import Features from './Features';
import FloatingUtilities from './FloatingUtilities';
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
			<WallessBanner className="py-8">
				<View className="px-4 mb-2 flex flex-row justify-between items-start">
					<Text className="flex flex-row gap-2 items-center text-xs text-color-7">
						Token value
						<View onTouchEnd={() => setIsBalanceVisible((prev) => !prev)}>
							{isBalanceVisible ? (
								<EyeOnIcon color="#FFFFFF80" size={16} />
							) : (
								<EyeOffIcon color="#FFFFFF80" size={16} />
							)}
						</View>
					</Text>

					<FloatingUtilities />
				</View>

				<View className="mb-9 px-4">
					<Text className="flex flex-row text-4xl text-color-7 font-bold">
						{isBalanceVisible ? <Text>~ {tokenValue}</Text> : '...'}
						<Text className="text-base ml-[2px] mr-1"> {currency}</Text>

						<View onTouchEnd={handleChangeCurrency} className="pt-1">
							<ChevronDownIcon size={16} color="#FFFFFF80" />
						</View>
					</Text>
				</View>

				<Features className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-80 rounded-lg" />
			</WallessBanner>

			{/* <SetupPasscode className="my-5 mx-4 px-3 py-2" /> */}

			<Text className="mt-10 text-center text-xs text-light-gray">
				<a href="#/profile">Let&apos;s get this excited and explore here</a>
			</Text>
		</View>
	);
};

export default Profile;
