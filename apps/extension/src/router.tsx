import { createHashRouter } from 'react-router-dom';
import DashboardScreen from 'screens/Dashboard';
import ChooseLayout from 'screens/Dashboard/ChooseLayout';
import Profile from 'screens/Dashboard/Profile';
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
				element: <ChooseLayout />,
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
