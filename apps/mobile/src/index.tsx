import { FC } from 'react';
import { GuiProvider } from '@walless/gui';

import config from '../tamagui.config';

import SplashScreen from './screens/Splash';

export const Index: FC = () => {
	return (
		<GuiProvider config={config}>
			<SplashScreen />
		</GuiProvider>
	);
};

export default Index;
