import { FC } from 'react';
import { GuiProvider, Stack, Text } from '@walless/gui';

import config from '../tamagui.config';

export const Index: FC = () => {
	return (
		<GuiProvider config={config}>
			<Stack flex={1} alignItems="center" justifyContent="center">
				<Text>Index!!</Text>
			</Stack>
		</GuiProvider>
	);
};

export default Index;
