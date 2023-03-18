import { createHashRouter, redirect } from 'react-router-dom';
import { ConnectionRequest } from 'screens/ConnectionRequest';
import DashboardScreen from 'screens/Dashboard';
import Explore from 'screens/Dashboard/Explore';
import LayoutDisplay from 'screens/Dashboard/LayoutDisplay';
import Profile from 'screens/Dashboard/Profile';
import { LayoutRequest } from 'screens/LayoutRequest';
import LoginScreen from 'screens/Login';
import PasscodeScreen from 'screens/Passcode';
import EnterPasscode from 'screens/Passcode/EnterPasscode';
import { SignatureRequest } from 'screens/SignatureRequest';
import { layoutProxy } from 'utils/state/layout';
import { snapshot } from 'valtio';

export const hashRouter = createHashRouter([
	{
		path: '/',
		element: <DashboardScreen />,
		children: [
			{
				path: '/profile',
				element: <Profile />,
			},
			{
				path: '/layouts/:layoutId',
				element: <LayoutDisplay />,
				loader: async ({ params }) => {
					const { layoutId } = params;
					const layout = snapshot(layoutProxy);
					const project = layout[layoutId || ''];
					if (!project) {
						return redirect('/');
					}
					return { params, project };
				},
			},
			{
				path: '/',
				element: <Explore />,
			},
		],
	},
	{
		path: '/connection-request',
		element: <ConnectionRequest />,
	},
	{
		path: '/signature-request',
		element: <SignatureRequest />,
	},
	{
		path: '/layout-request',
		element: <LayoutRequest />,
	},
	{
		path: '/login',
		element: <LoginScreen />,
	},
	{
		path: '/passcode',
		element: <PasscodeScreen />,
	},
	{
		path: '/enter-passcode',
		element: <EnterPasscode />,
	},
]);
