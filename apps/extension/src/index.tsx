import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import SplashScreen from 'components/Splash';
import { useSnapshot } from 'utils/hook';
import { hashRouter } from 'utils/router';
import { appState } from 'utils/state/app';

export const AppContainer: FC = () => {
	const app = useSnapshot(appState);

	if (app.loading) {
		return <SplashScreen />;
	}

	return <RouterProvider router={hashRouter} />;
};

export default AppContainer;
