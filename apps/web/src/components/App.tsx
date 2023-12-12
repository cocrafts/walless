import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { RouterProvider } from 'react-router-dom';
import { useResponsive } from '@walless/app';
import { appState } from '@walless/engine';
import { modalActions, ModalManager } from '@walless/gui';
import { router } from 'utils/routing';
import { useSnapshot } from 'valtio';

import SplashWrapper from './Splash';

interface Props {
	width?: number;
	height?: number;
}

const App: FC<Props> = ({ width = 410, height = 600 }) => {
	const app = useSnapshot(appState);
	const { isMobileResponsive } = useResponsive();
	const containerRef = useRef<View>(null);
	const containerStyle: ViewStyle = isMobileResponsive
		? styles.container
		: styles.wrappedContainer;
	const wrappedAppStyle: ViewStyle = {
		width,
		maxHeight: height,
		borderRadius: 8,
		overflow: 'hidden',
	};

	useEffect(() => {
		modalActions.setContainerRef(containerRef);
	}, []);

	return (
		<View style={containerStyle}>
			<View
				ref={containerRef}
				style={[styles.appContainer, !isMobileResponsive && wrappedAppStyle]}
			>
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
	},
	wrappedContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	appContainer: {
		flex: 1,
		backgroundColor: '#19232c',
	},
});
