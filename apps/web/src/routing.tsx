import { createHashRouter } from 'react-router-dom';

import DashboardScreen from './screens/Dashboard';
import ProfileScreen from './screens/Profile';
import RequestConnection from './screens/Request/Connection';

export const router = createHashRouter([
	{
		path: '/profile',
		element: <ProfileScreen />,
	},
	{
		path: '/:layoutId?',
		element: <DashboardScreen />,
	},
	{
		path: '/request-connection',
		element: <RequestConnection />,
	},
]);
