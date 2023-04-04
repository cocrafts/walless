import { FC, ReactElement, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Stack, TamaguiInternalConfig, TamaguiProvider } from '@tamagui/core';

import { modalActions } from '../state/modal';

import ModalManager from './ModalManager';

interface Props {
	config: TamaguiInternalConfig;
	children?: ReactElement;
	disableInjectCSS?: boolean;
	disableRootThemeClass?: boolean;
	theme?: string;
}

export const GuiProvider: FC<Props> = ({
	config,
	theme,
	children,
	disableInjectCSS,
	disableRootThemeClass,
}) => {
	const containerRef = useRef<View>(null);

	useEffect(() => {
		modalActions.setContainerRef(containerRef);
	}, []);

	return (
		<TamaguiProvider
			config={config}
			disableInjectCSS={disableInjectCSS}
			disableRootThemeClass={disableRootThemeClass}
			defaultTheme={theme}
		>
			<Stack ref={containerRef} flex={1}>
				{children}
				<ModalManager />
			</Stack>
		</TamaguiProvider>
	);
};

export default GuiProvider;
