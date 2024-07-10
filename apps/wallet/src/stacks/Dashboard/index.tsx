import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { runtime } from '@walless/core';
import { showFirstTimePopup } from 'modals/FirstTimePopup';
import BrowserScreen from 'screens/Dashboard/Browser';
import HomeStack from 'stacks/Home';
import SettingStack from 'stacks/Setting';
import { appState } from 'state/app';
import { mockWidgets } from 'state/widget';
import { noHeaderNavigation } from 'utils/constants';
import {
	useNotificationPermissionRequest,
	useSnapshot,
	useWidgets,
} from 'utils/hooks';
import { universalLocalStorage } from 'utils/localStorage';
import type { DashboardParamList } from 'utils/navigation';

import ExplorerStack from '../Explorer';

import TabBar from './TabBar';

const Tab = createBottomTabNavigator<DashboardParamList>();

export const DashboardStack = () => {
	useNotificationPermissionRequest();
	const { showFirstTimePopup: showPopup } = useSnapshot(appState);
	const widgets = useWidgets();

	useEffect(() => {
		const alreadyHavePixeverse = widgets.some(
			(widget) => widget._id === mockWidgets[0]._id,
		);

		if (showPopup && !alreadyHavePixeverse) {
			showFirstTimePopup();
			universalLocalStorage.setItem('showPopup', JSON.stringify(false));
			appState.showFirstTimePopup = false;
		}
	}, []);

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
			{runtime.isMobile && (
				<Tab.Screen name="Browser" component={BrowserScreen} />
			)}
			<Tab.Screen name="Setting" component={SettingStack} />
		</Tab.Navigator>
	);
};

export default DashboardStack;
