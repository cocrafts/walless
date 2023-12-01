import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from 'stacks/Home';
import SettingStack from 'stacks/Setting';
import { noHeaderNavigation } from 'utils/helper';
import {
	useNotificationPermissionRequest,
	useSafeAreaInsets,
} from 'utils/hooks';
import type { DashboardParamList } from 'utils/navigation';

import Header from '../components/Header';
import DrawerStack from '../Drawer';

import TabBar from './TabBar';

const Tab = createBottomTabNavigator<DashboardParamList>();

export const DashboardStack = () => {
	useNotificationPermissionRequest();
	const insets = useSafeAreaInsets();

	const screenOptions: BottomTabNavigationOptions = {
		header({ route }) {
			return <Header topInset={insets.top} title={route.name} />;
		},
	};

	return (
		<Tab.Navigator
			screenOptions={screenOptions}
			tabBar={(props) => <TabBar tabProps={props} />}
		>
			<Tab.Screen
				name="Explore"
				component={DrawerStack}
				options={noHeaderNavigation}
			/>
			<Tab.Screen
				name="Home"
				component={HomeStack}
				options={noHeaderNavigation}
			/>
			<Tab.Screen name="Setting" component={SettingStack} />
		</Tab.Navigator>
	);
};

export default DashboardStack;
