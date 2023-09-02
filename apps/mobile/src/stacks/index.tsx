import type { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { themeState } from '@walless/gui';

import CreatePasscodeScreen from '../screens/CreatePasscode';
import DashboardScreen from '../screens/Dashboard';
import InvitationScreen from '../screens/Invitation';
import LoginScreen from '../screens/Login';
import RecoveryScreen from '../screens/Recovery';
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
					name="Invitation"
					component={InvitationScreen}
					options={screenOptions.fade}
				/>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={screenOptions.bottomFade}
				/>
				<Stack.Screen
					name="CreatePasscode"
					component={CreatePasscodeScreen}
					options={screenOptions.bottomFade}
				/>
				<Stack.Screen
					name="Recovery"
					component={RecoveryScreen}
					options={screenOptions.bottomFade}
				/>
				<Stack.Screen
					name="Dashboard"
					component={DashboardScreen}
					options={screenOptions.bottomFade}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppStack;
