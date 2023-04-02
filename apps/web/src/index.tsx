import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { GuiProvider } from '@walless/gui';
import { useSnapshot } from 'valtio';

import config from '../tamagui.config';

import SplashWrapper from './components/Splash';
import { appState } from './state/app';
import { router } from './routing';

import '@tamagui/core/reset.css';

const App: FC = () => {
	const app = useSnapshot(appState);

	if (app.loading) {
		return <SplashWrapper />;
	}

	return <RouterProvider router={router} />;
};

export const AppContainer: FC = () => {
	return (
		<GuiProvider config={config}>
			<App />
		</GuiProvider>
	);
};

export default AppContainer;
