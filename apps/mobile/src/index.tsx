import { FC } from 'react';
import { GuiProvider, Stack } from '@walless/gui';

import config from '../tamagui.config';

import SplashScreen from './screens/Splash';

export const Index: FC = () => {
	return (
		<GuiProvider config={config}>
			<Stack flex={1}>
				<SplashScreen />
			</Stack>
		</GuiProvider>
	);
};

export default Index;
