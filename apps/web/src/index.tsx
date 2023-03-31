import { FC } from 'react';
import { GuiProvider, Stack, Text } from '@walless/gui';

import config from '../tamagui.config';

import '@tamagui/core/reset.css';

export const AppContainer: FC = () => {
	return (
		<GuiProvider config={config}>
			<Stack flex={1} alignItems="center" justifyContent="center">
				<Text color="black" fontSize={18}>
					Welcome!
				</Text>
			</Stack>
		</GuiProvider>
	);
};

export default AppContainer;
