import { FC, ReactElement, useEffect } from 'react';
import { View } from 'react-native';
import {
	Stack,
	TamaguiInternalConfig,
	TamaguiProvider,
	useSafeRef,
} from 'tamagui';

import { modalActions } from '../state/modal';

import ModalManager from './ModalManager';

interface Props {
	config: TamaguiInternalConfig;
	children?: ReactElement;
}

export const WuiProvider: FC<Props> = ({ config, children }) => {
	const containerRef = useSafeRef<View>(null);

	useEffect(() => {
		modalActions.setContainerRef(containerRef);
	}, []);

	return (
		<TamaguiProvider config={config}>
			<Stack ref={containerRef} flex={1}>
				{children}
				<ModalManager />
			</Stack>
		</TamaguiProvider>
	);
};

export default WuiProvider;
