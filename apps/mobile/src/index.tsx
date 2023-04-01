import { FC } from 'react';
import { SplashScreen } from '@walless/app';
import { GuiProvider } from '@walless/gui';

import config from '../tamagui.config';

export const Index: FC = () => {
	return (
		<GuiProvider config={config}>
			<SplashScreen />
		</GuiProvider>
	);
};

export default Index;
