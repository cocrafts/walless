import { createHashRouter } from 'react-router-dom';
import DashboardScreen from 'screens/Dashboard';
import Explore from 'screens/Dashboard/Explore';
import Profile from 'screens/Dashboard/Profile';
import SendToken from 'screens/Dashboard/SendToken';
import LoginScreen from 'screens/Login';
import PasscodeScreen from 'screens/Passcode';

export const router = createHashRouter([
	{
		path: '/',
		element: <DashboardScreen />,
		children: [
			{
				path: '/profile',
				element: <Profile />,
			},
			{
				path: '/explore',
				element: <Explore />,
			},
			{
				path: '/send-token',
				element: <SendToken />,
			},
		],
	},
	{
		path: '/login',
		element: <LoginScreen />,
	},
	{
		path: '/passcode',
		element: <PasscodeScreen />,
	},
]);
