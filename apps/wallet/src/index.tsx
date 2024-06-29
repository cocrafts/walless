import { useEffect, useRef } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { modalActions, ModalManager, themeState } from '@walless/gui';
import ApplicationStack from 'stacks/Application';
import { appState } from 'state/app';
import {
	useNavigationHydrate,
	useNotifications,
	useSnapshot,
} from 'utils/hooks';
import { linking, navigationRef } from 'utils/navigation';

export const AppStack = () => {
	const modalContainerRef = useRef<View>(null);
	const theme = useSnapshot(themeState);
	const { isMobileDisplay } = useSnapshot(appState);

	const containerStyle: StyleProp<ViewStyle> = [
		styles.container,
		!isMobileDisplay && styles.centerLayout,
	];

	const innerStyle: StyleProp<ViewStyle> = [
		styles.innerLayout,
		!isMobileDisplay && styles.extensionLayout,
	];
	const hydrate = useNavigationHydrate();

	useNotifications();
	useEffect(() => modalActions.setContainerRef(modalContainerRef), []);
	useEffect(() => {
		if (Platform.OS === 'android') {
			StatusBar.setTranslucent(true);
			StatusBar.setBackgroundColor('transparent');
		}
	}, []);

	return (
		<SafeAreaProvider>
			<View style={containerStyle}>
				<View style={innerStyle} ref={modalContainerRef}>
					<NavigationContainer
						ref={navigationRef}
						theme={theme}
						linking={linking}
						onReady={hydrate.onNavigationReady}
						onStateChange={hydrate.onNavigationStateChange}
					>
						<ApplicationStack />
					</NavigationContainer>
					<ModalManager />
				</View>
			</View>
		</SafeAreaProvider>
	);
};

export default AppStack;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	centerLayout: {
		justifyContent: 'center',
	},
	innerLayout: {
		maxWidth: 420,
		width: '100%',
		flex: 1,
	},
	extensionLayout: {
		maxHeight: 600,
		borderRadius: 10,
		overflow: 'hidden',
	},
});
