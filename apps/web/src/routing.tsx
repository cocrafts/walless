import { createHashRouter } from 'react-router-dom';

import DashboardScreen from './screens/Dashboard';
import ProfileScreen from './screens/Profile';
import RequestConnection from './screens/Request/Connection';
import RequestSignature from './screens/Request/Signature';

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
	{
		path: '/request-signature',
		element: <RequestSignature />,
	},
]);
