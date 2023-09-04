import type { FC } from 'react';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactScreen from 'screens/Dashboard/Contact';
import ExplorerScreen from 'screens/Dashboard/Explorer';
import SettingScreen from 'screens/Dashboard/Setting';

import HomeStack from './Home';

const Tab = createBottomTabNavigator();

export const DashboardStack: FC = () => {
	return (
		<Tab.Navigator screenOptions={screenOptions}>
			<Tab.Screen name="Home" component={HomeStack} />
			<Tab.Screen name="Explorer" component={ExplorerScreen} />
			<Tab.Screen name="Contact" component={ContactScreen} />
			<Tab.Screen name="Setting" component={SettingScreen} />
		</Tab.Navigator>
	);
};

export default DashboardStack;

const screenOptions: BottomTabNavigationOptions = {
	headerShown: false,
};
