import type { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardHomeScreen from 'screens/Dashboard/Home';
import { screenOptions } from 'utils/navigation';

const Stack = createStackNavigator();

export const HomeStack: FC = () => {
	return (
		<Stack.Navigator screenOptions={screenOptions.navigator}>
			<Stack.Screen
				name="Network"
				component={DashboardHomeScreen}
				options={screenOptions.fade}
			/>
		</Stack.Navigator>
	);
};

export default HomeStack;
