import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerNavigation } from 'components/DrawerNavigation';
import ExploreScreen from 'screens/Dashboard/Explore';
import ProfileScreen from 'screens/Dashboard/Profile';
import type { DashboardParamList } from 'utils/navigation';

import TabBar from './TabBar';

const Tab = createBottomTabNavigator<DashboardParamList>();

export const BottomTabNavigation = () => {
	const screenOptions: BottomTabNavigationOptions = {
		headerShown: false,
	};

	return (
		<Tab.Navigator
			screenOptions={screenOptions}
			tabBar={(props) => <TabBar {...props} />}
		>
			<Tab.Screen name="Home" component={DrawerNavigation} />
			<Tab.Screen name="Explore" component={ExploreScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	);
};

export default BottomTabNavigation;
