import { BellIcon, IdCardIcon, SettingIcon, View } from '@walless/ui';

const FloatingUtilities = () => {
	return (
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
	);
};

export default FloatingUtilities;
