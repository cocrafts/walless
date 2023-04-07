import { FC, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { TamaguiInternalConfig } from '@tamagui/core';
import { modalActions, ModalManager } from '@walless/app';
import { GuiProvider, Stack } from '@walless/gui';
import App from 'components/App';

interface Props {
	tamaguiConfig: TamaguiInternalConfig;
}

export const AppContainer: FC<Props> = ({ tamaguiConfig }) => {
	const containerRef = useRef<View>(null);

	useEffect(() => {
		modalActions.setContainerRef(containerRef);
	}, []);

	return (
		<GuiProvider config={tamaguiConfig}>
			<Stack ref={containerRef} flex={1}>
				<App />
				<ModalManager />
			</Stack>
		</GuiProvider>
	);
};

export default AppContainer;
