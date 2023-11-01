import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar, { tabBarHeight } from 'components/TabNavivation/TabBar';
import ContactScreen from 'screens/Dashboard/Contact';
import ExploreScreen from 'screens/Dashboard/Explore';
import ProfileScreen from 'screens/Dashboard/Profile';
import SettingScreen from 'screens/Dashboard/Setting';
import type { DashboardParamList } from 'utils/navigation';

import HomeStack from './Home';

const Tab = createBottomTabNavigator<DashboardParamList>();

export const DashboardStack: FC = () => {
	const screenOptions: BottomTabNavigationOptions = {
		headerShown: false,
	};
	const sceneContainerStyle: StyleProp<ViewStyle> = {
		marginBottom: tabBarHeight,
	};

	return (
		<Tab.Navigator
			screenOptions={screenOptions}
			tabBar={TabBar}
			sceneContainerStyle={sceneContainerStyle}
		>
			<Tab.Screen name="Home" component={HomeStack} />
			<Tab.Screen name="Explore" component={ExploreScreen} />
			<Tab.Screen name="Contact" component={ContactScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
			<Tab.Screen name="Setting" component={SettingScreen} />
		</Tab.Navigator>
	);
};

export default DashboardStack;
