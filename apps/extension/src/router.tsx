import { createHashRouter, redirect } from 'react-router-dom';
import DashboardScreen from 'screens/Dashboard';
import Explore from 'screens/Dashboard/Explore';
import Profile from 'screens/Dashboard/Profile';
import ProjectLayouts from 'screens/Dashboard/ProjectLayouts';
import SendToken from 'screens/Dashboard/SendToken';
import LoginScreen from 'screens/Login';
import PasscodeScreen from 'screens/Passcode';
import { layoutProxy } from 'utils/state/layout';
import { snapshot } from 'valtio';

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
			{
				path: '/layouts/:layoutId',
				element: <ProjectLayouts />,
				loader: async ({ params }) => {
					const { layoutId } = params;
					const layout = snapshot(layoutProxy);
					const project = layout[layoutId || ''];
					if (!project) {
						return redirect('/explore');
					}
					return project;
				},
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
