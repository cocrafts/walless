import React from 'react';
import {
	ArrowBottomRightIcon,
	ArrowTopRightIcon,
	BellIcon,
	Button,
	ChevronDownIcon,
	ChevronRightIcon,
	EyeOffIcon,
	EyeOnIcon,
	IdCardIcon,
	SettingIcon,
	Text,
	View,
} from '@walless/ui';
import WallessBackground from 'components/walless-background';

import FeatureButton from './FeatureButton';

export interface FeatureButtonProps {
	title: string;
	icon: React.ReactNode;
	onPress: () => void;
}

const mockFeatureButtons: FeatureButtonProps[] = [
	{
		title: 'Send',
		icon: <ArrowTopRightIcon color="#29A4D6" size={12} />,
		onPress: () => {
			console.log('Send');
		},
	},
	{
		title: 'Receive',
		icon: <ArrowBottomRightIcon color="#29A4D6" size={12} />,
		onPress: () => {
			console.log('Receive');
		},
	},
	{
		title: 'Buy',
		icon: <ChevronRightIcon color="#29A4D6" size={12} />,
		onPress: () => {
			console.log('Buy');
		},
	},
	{
		title: 'Swap',
		icon: <ChevronRightIcon color="#29A4D6" size={12} />,
		onPress: () => {
			console.log('Swap');
		},
	},
];

const Profile: React.FC = () => {
	const [isBalanceVisible, setIsBalanceVisible] = React.useState(false);
	const [currency, setCurrency] = React.useState('USD');
	const [tokenValue, setTokenValue] = React.useState('200');

	const handleChangeCurrency = () => {
		setCurrency(currency === 'USD' ? 'VND' : 'USD');
	};

	return (
		<View className="bg-gradient-to-b from-[#003356] to-[#011726] h-full">
			<WallessBackground className="py-8">
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

					<View className="flex flex-row items-end gap-3">
						<View className="w-6 h-6 bg-[#80D0DC] rounded-full flex justify-center items-center">
							<IdCardIcon color="white" size={12} />
						</View>

						<View className="w-6 h-6 bg-[#80D0DC] rounded-full flex justify-center items-center">
							<SettingIcon color="white" size={12} />
						</View>

						<View className="w-6 h-6 bg-[#80D0DC] rounded-full flex justify-center items-center">
							<BellIcon color="white" size={12} />
						</View>
					</View>
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

				<View className="mx-4 flex flex-row justify-around divide-x divide-[#38576B]">
					{mockFeatureButtons.map((button) => (
						<FeatureButton key={button.title} {...button} />
					))}
				</View>
			</WallessBackground>

			<View className="mt-2 mx-4 px-3 py-2 bg-[#0C3B5A]">
				<Text className="text-color-7 font-bold">
					Setup your passcode/password
				</Text>
				<Text className="text-color-7 mt-2 mb-3">
					Enhance your security is important because......
				</Text>
				<Button
					title="Setup Now"
					className="bg-color-2 w-fit px-2 py-1"
					titleClass="text-xs"
				/>
			</View>

			<Text className="text-center mt-5 text-xs text-light-gray">
				Let&apos;s get this excited and explore{' '}
				<a className="text-color-7/50 underline" href="#">
					here
				</a>
			</Text>
		</View>
	);
};

export default Profile;
