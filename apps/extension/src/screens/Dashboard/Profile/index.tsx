import React from 'react';
import { Text, View } from '@walless/ui';

const Profile: React.FC = () => {
	return (
		<View className="bg-white h-full">
			<View className="bg-[#E4E4E4]">Account Balance</View>
			<Text className="text-center mt-5 text-gray">
				Let&apos;s get this excited and explore <a href="#">here</a>
			</Text>
		</View>
	);
};

export default Profile;
