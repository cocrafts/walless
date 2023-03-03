import { BellIcon, IdCardIcon, SettingIcon, View } from '@walless/ui';

interface FloatingUtilityButtonProps {
	icon: React.ReactNode;
	className?: string;
	onPress?: () => void;
}

const floatingUtilities: FloatingUtilityButtonProps[] = [
	{
		icon: <IdCardIcon color="white" size={12} />,
	},
	{
		icon: <BellIcon color="white" size={12} />,
	},
	{
		icon: <SettingIcon color="white" size={12} />,
	},
];

const FloatingUtilities = () => {
	return (
		<View className="flex flex-row items-end gap-3">
			{floatingUtilities.map((utility, index) => {
				return (
					<View
						key={index}
						className="w-6 h-6 bg-[#80D0DC] hover:bg-[#C6F7FE] transition rounded-full flex justify-center items-center"
					>
						{utility.icon}
					</View>
				);
			})}
		</View>
	);
};

export default FloatingUtilities;
