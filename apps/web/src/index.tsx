import type { FC } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { TamaguiInternalConfig } from '@tamagui/core';
import { GuiProvider } from '@walless/ui';
import App from 'components/App';

import '@walless/app/utils/modal';

interface Props {
	tamaguiConfig: TamaguiInternalConfig;
}

export const AppContainer: FC<Props> = ({ tamaguiConfig }) => {
	return (
		<SafeAreaProvider>
			<GuiProvider config={tamaguiConfig} theme="dark">
				<App />
			</GuiProvider>
		</SafeAreaProvider>
	);
};

export default AppContainer;
