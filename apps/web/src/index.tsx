import { FC } from 'react';
import { TamaguiInternalConfig } from '@tamagui/core';
import { GuiProvider } from '@walless/gui';
import App from 'components/App';

interface Props {
	tamaguiConfig: TamaguiInternalConfig;
}

export const AppContainer: FC<Props> = ({ tamaguiConfig }) => {
	return (
		<GuiProvider config={tamaguiConfig} theme="dark">
			<App />
		</GuiProvider>
	);
};

export default AppContainer;
