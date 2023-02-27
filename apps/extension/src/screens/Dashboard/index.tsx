import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '@walless/ui';

import DashboardLayout from './Layout';

export const HomeScreen: FC = () => {
	return (
		<DashboardLayout contentContainerClass="bg-gradient-to-b from-color-5 to-color-6 flex-1">
			<Text className="text-white text-5xl mb-3">COMING SOON!</Text>
			<Text>
				<Text className="text-gray-400">Created with ❤️ by Metacraft</Text>
			</Text>
			<Link to="login">Login</Link>
		</DashboardLayout>
	);
};

export default HomeScreen;
