import type { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { themeState } from '@walless/gui';
import SplashScreen from 'screens/Splash';
import { useSnapshot } from 'utils/hooks';
import type { RootParamList } from 'utils/navigation';
import { linking, navigationRef, screenOptions } from 'utils/navigation';

import AuthenticationStack from './Authentication';
import DashboardStack from './Dashboard';

const Stack = createStackNavigator<RootParamList>();

export const AppStack: FC<StackScreenProps<RootParamList>> = () => {
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
	);
};

export default AppStack;
