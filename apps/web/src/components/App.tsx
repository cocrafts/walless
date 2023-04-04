import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useSnapshot } from 'valtio';

import { router } from '../routing';
import { appState } from '../state/app';

import SplashWrapper from './Splash';

const App: FC = () => {
	const app = useSnapshot(appState);

	if (app.loading) {
		return <SplashWrapper />;
	}

	return <RouterProvider router={router} />;
};

export default App;
