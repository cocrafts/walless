import { createHashRouter } from 'react-router-dom';
import DashboardScreen from 'screens/Dashboard';
import ExploreScreen from 'screens/Explore';
import LoginScreen from 'screens/Login';
import PasscodeScreen from 'screens/Passcode';
import ProfileScreen from 'screens/Profile';
import RequestConnection from 'screens/Request/Connection';
import RequestLayout from 'screens/Request/Layout';
import RequestSignature from 'screens/Request/Signature';

export const router = createHashRouter([
	{
		path: '/',
		element: <DashboardScreen />,
		children: [
			{
				path: '/',
				element: <ExploreScreen />,
			},
			{
				path: '/profile',
				element: <ProfileScreen />,
			},
			{
				path: '/:layoutId?',
				element: <DashboardScreen />,
			},
		],
	},
	{
		path: '/passcode/:feature',
		element: <PasscodeScreen />,
		loader: async ({ params }) => {
			return params;
		},
	},
	{
		path: '/login',
		element: <LoginScreen />,
	},
	{
		path: '/request-connection',
		element: <RequestConnection />,
	},
	{
		path: '/request-signature',
		element: <RequestSignature />,
	},
	{
		path: '/request-layout',
		element: <RequestLayout />,
	},
]);
