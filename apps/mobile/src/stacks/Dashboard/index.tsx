import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from 'screens/Dashboard/Explore';
import ProfileStack from 'stacks/Profile';
import { useNotificationPermissionRequest } from 'utils/hooks';
import type { DashboardParamList } from 'utils/navigation';

import DrawerStack from '../Drawer';

import TabBar from './TabBar';

const Tab = createBottomTabNavigator<DashboardParamList>();

export const DashboardStack = () => {
	useNotificationPermissionRequest();

	const screenOptions: BottomTabNavigationOptions = {
		headerShown: false,
	};

	return (
		<Tab.Navigator
			screenOptions={screenOptions}
			tabBar={(props) => <TabBar tabProps={props} />}
		>
			<Tab.Screen name="Home" component={DrawerStack} />
			<Tab.Screen name="Explore" component={ExploreScreen} />
			<Tab.Screen name="Profile" component={ProfileStack} />
		</Tab.Navigator>
	);
};

export default DashboardStack;
