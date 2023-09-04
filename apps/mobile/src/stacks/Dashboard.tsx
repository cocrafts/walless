import type { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardHomeScreen from 'screens/Dashboard/Home';
import { screenOptions } from 'utils/navigation';

const Stack = createStackNavigator();

export const DashboardStack: FC = () => {
	return (
		<Stack.Navigator screenOptions={screenOptions.navigator}>
			<Stack.Screen
				name="Home"
				component={DashboardHomeScreen}
				options={screenOptions.fade}
			/>
		</Stack.Navigator>
	);
};

export default DashboardStack;
