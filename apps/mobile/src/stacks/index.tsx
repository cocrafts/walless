import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { modalActions, ModalManager, themeState } from '@walless/gui';
import SplashScreen from 'screens/Splash';
import { useSnapshot } from 'utils/hooks';
import type { RootParamList } from 'utils/navigation';
import { linking, navigationRef, screenOptions } from 'utils/navigation';

import AuthenticationStack from './Authentication';
import DashboardStack from './Dashboard';

const Stack = createStackNavigator<RootParamList>();

export const AppStack = () => {
	const modalContainerRef = useRef<View>(null);
	const theme = useSnapshot(themeState);

	useEffect(() => {
		modalActions.setContainerRef(modalContainerRef);
	}, []);

	return (
		<View style={styles.container} ref={modalContainerRef}>
			<NavigationContainer ref={navigationRef} linking={linking} theme={theme}>
				<Stack.Navigator screenOptions={screenOptions.navigator}>
					<Stack.Screen
						name="Splash"
						component={SplashScreen}
						options={screenOptions.fade}
					/>
					<Stack.Screen
						name="Authentication"
						component={AuthenticationStack}
						options={screenOptions.fade}
					/>
					<Stack.Screen
						name="Dashboard"
						component={DashboardStack}
						options={screenOptions.bottomFade}
					/>
				</Stack.Navigator>
			</NavigationContainer>
			<ModalManager />
		</View>
	);
};

export default AppStack;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
