import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { appState } from 'state/app';
import { router } from 'utils/routing';
import { useSnapshot } from 'valtio';

import SplashWrapper from './Splash';

const App: FC = () => {
	const app = useSnapshot(appState);

	if (app.loading) {
		return <SplashWrapper />;
	} else {
		return <RouterProvider router={router} />;
	}
};

export default App;
