import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { GuiProvider } from '@walless/gui';

import config from '../tamagui.config';

import { router } from './routing';

import '@tamagui/core/reset.css';

const App: FC = () => {
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
