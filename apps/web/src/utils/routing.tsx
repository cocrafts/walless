import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import { PopupType } from '@walless/messaging';
import DashboardScreen from 'screens/Dashboard';
import EmbeddedApp from 'screens/Dashboard/Embed';
import ExploreScreen from 'screens/Explore';
import InvitationScreen from 'screens/Invitation';
import LoginScreen from 'screens/Login';
import PasscodeScreen from 'screens/Passcode';
import ProfileScreen from 'screens/Profile';
import RequestConnection from 'screens/Request/Connection';
import RequestLayout from 'screens/Request/Layout';
import RequestSignature from 'screens/Request/Signature';
import SettingScreen from 'screens/Setting';

const createRouter =
	BUILD_TARGET === 'extension' ? createHashRouter : createBrowserRouter;

export const router = createRouter([
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
				path: '/setting',
				element: <SettingScreen />,
			},
			{
				path: '/:id',
				element: <EmbeddedApp />,
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
		path: '/invitation',
		element: <InvitationScreen />,
	},
	{
		path: `/${PopupType.REQUEST_CONNECT_POPUP}/:requestId`,
		element: <RequestConnection />,
	},
	{
		path: `/${PopupType.SIGNATURE_POPUP}/:requestId`,
		element: <RequestSignature />,
	},
	{
		path: `/${PopupType.REQUEST_INSTALL_LAYOUT_POPUP}/:requestId`,
		element: <RequestLayout />,
	},
]);
