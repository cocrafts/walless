import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationScreen from 'screens/Authentication';
import HomeScreen from 'screens/Home';
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
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Authentication" component={AuthenticationScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootStack;
