import { createHashRouter, redirect } from 'react-router-dom';
import DashboardScreen from 'screens/Dashboard';
import Explore from 'screens/Dashboard/Explore';
import Profile from 'screens/Dashboard/Profile';
import ProjectLayouts from 'screens/Dashboard/ProjectLayouts';
import SendToken from 'screens/Dashboard/SendToken';
import ConfirmTransaction from 'screens/Dashboard/SendToken/ConfirmTransaction';
import SendTokenHome from 'screens/Dashboard/SendToken/SendTokenHome';
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
