import { FC, ReactElement, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Stack, TamaguiInternalConfig, TamaguiProvider } from 'tamagui';

import { modalActions } from '../state/modal';

import ModalManager from './ModalManager';

interface Props {
	config: TamaguiInternalConfig;
	theme?: string;
	children?: ReactElement;
}

export const WuiProvider: FC<Props> = ({ config, theme, children }) => {
	const containerRef = useRef<View>(null);

	useEffect(() => {
		modalActions.setContainerRef(containerRef);
	}, []);

	return (
		<TamaguiProvider
			config={config}
			disableInjectCSS
			disableRootThemeClass
			defaultTheme={theme}
		>
			<Stack ref={containerRef} flex={1}>
				{children}
				<ModalManager />
			</Stack>
		</TamaguiProvider>
	);
};

export default WuiProvider;
