import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Text, View } from '@walless/ui';

export const HomeScreen: FC = () => {
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-white text-5xl mb-3">COMING SOON!</Text>
			<Text>
				<Text className="text-gray-400">Created with ❤️ by Metacraft</Text>
			</Text>
			<Link to="login">Login</Link>
		</View>
	);
};

export default HomeScreen;
