import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { modalActions, ModalManager, themeState } from '@walless/gui';
import ApplicationStack from 'stacks/Application';
import {
	useNavigationHydrate,
	useNotifications,
	useSnapshot,
} from 'utils/hooks';
import { linking, navigationRef } from 'utils/navigation';

export const AppStack = () => {
	const modalContainerRef = useRef<View>(null);
	const theme = useSnapshot(themeState);
	const hydrate = useNavigationHydrate();

	useNotifications();
	useEffect(() => modalActions.setContainerRef(hydrate.modalContainerRef), []);

	return (
		<SafeAreaProvider>
			<View style={styles.container} ref={modalContainerRef}>
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
		</SafeAreaProvider>
	);
};

export default AppStack;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
