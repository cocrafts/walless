import { FC } from 'react';
import { Stack, Text, WuiProvider } from '@walless/wui';

import config from '../tamagui.config';

import '@tamagui/core/reset.css';

export const AppContainer: FC = () => {
	return (
		<WuiProvider config={config}>
			<Stack flex={1}>
				<Text>Hmmm</Text>
			</Stack>
		</WuiProvider>
	);
};

export default AppContainer;
