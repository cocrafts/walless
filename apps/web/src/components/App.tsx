import { FC, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { RouterProvider } from 'react-router-dom';
import { modalActions, ModalManager } from '@walless/app';
import { Stack } from '@walless/ui';
import { appState } from 'state/app';
import { router } from 'utils/routing';
import { useSnapshot } from 'valtio';

import SplashWrapper from './Splash';

interface Props {
	width?: number;
	height?: number;
}

const App: FC<Props> = ({ width = 410, height = 600 }) => {
	const app = useSnapshot(appState);
	const containerRef = useRef<View>(null);

	useEffect(() => {
		modalActions.setContainerRef(containerRef);
	}, []);

	return (
		<Stack flex={1} alignItems="center" justifyContent="center">
			<Stack
				ref={containerRef}
				flex={1}
				width={width}
				maxHeight={height}
				backgroundColor="$primary"
				$gtTn={{ borderRadius: 8, overflow: 'hidden' }}
			>
				{app.loading ? <SplashWrapper /> : <RouterProvider router={router} />}
				<ModalManager />
			</Stack>
		</Stack>
	);
};

export default App;
