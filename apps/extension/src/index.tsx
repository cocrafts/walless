import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import SplashScreen from 'components/Splash';
import { useSnapshot } from 'utils/hook';
import { appState } from 'utils/state/app';

import { router } from './router';

export const AppContainer: FC = () => {
	const app = useSnapshot(appState);

	if (app.loading) {
		return <SplashScreen />;
	}

	return <RouterProvider router={router} />;
};

export default AppContainer;
