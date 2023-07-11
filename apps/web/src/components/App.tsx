import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { RouterProvider } from 'react-router-dom';
import { modalActions, ModalManager } from '@walless/gui';
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
	const appContainerStyle: ViewStyle = {
		flex: 1,
		width,
		maxHeight: height,
		backgroundColor: '#19232c',
		borderRadius: 8,
		overflow: 'hidden',
	};

	useEffect(() => {
		modalActions.setContainerRef(containerRef);
	}, []);

	return (
		<View style={styles.container}>
			<View ref={containerRef} style={appContainerStyle}>
				{app.loading ? <SplashWrapper /> : <RouterProvider router={router} />}
				<ModalManager />
			</View>
		</View>
	);
};

export default App;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
