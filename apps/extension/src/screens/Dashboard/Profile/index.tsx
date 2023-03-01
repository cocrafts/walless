import React from 'react';
import {
	BellIcon,
	Button,
	ChevronRightIcon,
	EyeOffIcon,
	IdCardIcon,
	SettingIcon,
	Text,
	View,
} from '@walless/ui';

import FeatureButton from './FeatureButton';

export interface FeatureButtonProps {
	title: string;
	icon: React.ReactNode;
	onPress: () => void;
}

const mockFeatureButtons = [
	{
		title: 'Send',
		icon: <ChevronRightIcon color="#00000080" size={12} />,
		onPress: () => {
			console.log('Send');
		},
	},
	{
		title: 'Receive',
		icon: <ChevronRightIcon color="#00000080" size={12} />,
		onPress: () => {
			console.log('Receive');
		},
	},
	{
		title: 'Buy',
		icon: <ChevronRightIcon color="#00000080" size={12} />,
		onPress: () => {
			console.log('Buy');
		},
	},
	{
		title: 'Swap',
		icon: <ChevronRightIcon color="#00000080" size={12} />,
		onPress: () => {
			console.log('Swap');
		},
	},
];

const Profile: React.FC = () => {
	const [isBalanceVisible, setIsBalanceVisible] = React.useState(false);
	const [currency, setCurrency] = React.useState('USD');

	const handleChangeCurrency = () => {
		setCurrency(currency === 'USD' ? 'VND' : 'USD');
	};

	return (
		<View className="bg-white h-full">
			<View className="bg-[#E4E4E4] py-8">
				<Text className="mb-2 px-4 flex flex-row gap-2 items-center text-xs text-color-7">
					Account Balance
					<View onTouchEnd={() => setIsBalanceVisible((prev) => !prev)}>
						<EyeOffIcon color="#0000004D" size={16} />
					</View>
				</Text>

				<View className="px-4 flex flex-row justify-between items-start">
					<Text className="flex flex-row text-3xl text-color-7 font-bold">
						{isBalanceVisible ? '200' : '...'} {currency}
						<View onTouchEnd={handleChangeCurrency}>
							<ChevronRightIcon size={32} color="#0000004D" />
						</View>
					</Text>

					<View className="flex flex-row items-end gap-3">
						<View className="w-4">
							<IdCardIcon color="#00000080" size={16} />
						</View>

						<View className="w-4">
							<SettingIcon color="#00000080" size={16} />
						</View>

						<View className="w-4">
							<BellIcon color="#00000080" size={16} />
						</View>
					</View>
				</View>

				<View className="mt-5 mb-3 h-[1px] bg-[#D1D1D1]"></View>

				<View className="flex flex-row justify-around">
					{mockFeatureButtons.map((button) => (
						<FeatureButton key={button.title} {...button} />
					))}
				</View>
			</View>

			<View className="mt-2 mx-4 px-3 py-2 bg-[#EFEFEF]">
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

			<Text className="text-center mt-5 text-xs text-color-7/50">
				Let&apos;s get this excited and explore{' '}
				<a className="text-color-7/50 underline" href="#">
					here
				</a>
			</Text>
		</View>
	);
};

export default Profile;
