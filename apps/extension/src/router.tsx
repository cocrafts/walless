import { createHashRouter } from 'react-router-dom';
import DashboardScreen from 'screens/Dashboard';
import LoginScreen from 'screens/Login';
import PasscodeScreen from 'screens/Passcode';

export const router = createHashRouter([
	{
		path: '/',
		element: <DashboardScreen />,
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
