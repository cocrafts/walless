import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from 'stacks/Home';
import SettingStack from 'stacks/Setting';
import { noHeaderNavigation } from 'utils/helper';
import { useNotificationPermissionRequest } from 'utils/hooks';
import type { DashboardParamList } from 'utils/navigation';

import ExplorerStack from '../Explorer';

import TabBar from './TabBar';

const Tab = createBottomTabNavigator<DashboardParamList>();

export const DashboardStack = () => {
	useNotificationPermissionRequest();

	return (
		<Tab.Navigator
			screenOptions={noHeaderNavigation}
			tabBar={(props) => <TabBar tabProps={props} />}
		>
			<Tab.Screen
				name="Explore"
				component={ExplorerStack}
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
