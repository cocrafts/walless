import { createHashRouter } from 'react-router-dom';

import DashboardScreen from './screens/Dashboard';
import ExploreScreen from './screens/Explore';
import ProfileScreen from './screens/Profile';
import RequestConnectionScreen from './screens/Request/Connection';

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
		path: '/request-connection',
		element: <RequestConnectionScreen />,
	},
]);
