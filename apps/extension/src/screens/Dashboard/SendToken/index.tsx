import { Outlet } from 'react-router-dom';
import { View } from '@walless/ui';

const SendToken = () => {
	return (
		<View className="h-screen w-full bg-[#1B415A] pt-5">
			<View className="h-full bg-gradient-to-b from-[#00131F] to-[#112C3F] rounded-lg flex items-center gap-5 px-4">
				<Outlet />
			</View>
		</View>
	);
};

export default SendToken;
