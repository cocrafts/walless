import type { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { themeState } from '@walless/gui';

import LoginScreen from '../screens/Login';
import SplashScreen from '../screens/Splash';
import { useSnapshot } from '../utils/hooks';
import type { RootParamList } from '../utils/navigation';
import { linking, navigationRef, screenOptions } from '../utils/navigation';

const Stack = createStackNavigator<RootParamList>();

export const AppStack: FC = () => {
	const theme = useSnapshot(themeState);

	return (
		<NavigationContainer ref={navigationRef} linking={linking} theme={theme}>
			<Stack.Navigator screenOptions={screenOptions.navigator}>
				<Stack.Screen
					name="Splash"
					component={SplashScreen}
					options={screenOptions.fade}
				/>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={screenOptions.fade}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppStack;
