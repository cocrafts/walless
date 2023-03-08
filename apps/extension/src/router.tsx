import { createHashRouter } from 'react-router-dom';
import DashboardScreen from 'screens/Dashboard';
import Explore from 'screens/Dashboard/Explore';
import Profile from 'screens/Dashboard/Profile';
import SendToken from 'screens/Dashboard/SendToken';
import ConfirmTransaction from 'screens/Dashboard/SendToken/ConfirmTransaction';
import SendTokenHome from 'screens/Dashboard/SendToken/SendTokenHome';
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
		],
	},
	{
		path: '/send-token',
		element: <SendToken />,
		children: [
			{
				path: '',
				element: <SendTokenHome />,
			},
			{
				path: 'confirm-token/:id',
				element: <ConfirmTransaction />,
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
