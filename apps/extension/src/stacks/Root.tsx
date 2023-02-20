import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from 'screens/Dashboard';
import LoginScreen from 'screens/Login';
import {
	linking,
	navigationRef,
	RootParamList,
	screenOptions,
} from 'stacks/internal';

const Stack = createStackNavigator<RootParamList>();

export const RootStack: FC = () => {
	return (
		<NavigationContainer ref={navigationRef} linking={linking}>
			<Stack.Navigator screenOptions={screenOptions}>
				<Stack.Screen name="Dashboard" component={DashboardScreen} />
				<Stack.Screen name="Login" component={LoginScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootStack;
