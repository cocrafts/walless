import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { DrawerNavigationOptions } from 'components/DrawerNavigation';
import { createDrawerNavigator } from 'components/DrawerNavigation';
import WidgetScreen from 'screens/Dashboard/Widget';
import CollectionStack from 'stacks/Explorer/CollectionStack';
import { appState } from 'state/app';
import { useSnapshot } from 'utils/hooks';
import type { ExploreParamList } from 'utils/navigation';

import LoyaltyStack from './Loyalty';
import ProfileStack from './ProfileStack';
import Sidebar, { sidebarWidth } from './Sidebar';

const Drawer = createDrawerNavigator<ExploreParamList>();

export const ExplorerStack = () => {
	const { navigationDisplay } = useSnapshot(appState);
	const screenOptions: DrawerNavigationOptions = useMemo(() => {
		return {
			headerShown: false,
			drawerStyle: styles.drawer,
			swipeEdgeWidth: 100,
			swipeMinDistance: sidebarWidth / 3,
			overlayColor: 'transparent',
			drawerType: navigationDisplay.isPermanentDrawer ? 'permanent' : 'back',
		};
	}, [navigationDisplay]);

	const options = useMemo(() => {
		return { unmountOnBlur: false };
	}, []);

	return (
		<Drawer.Navigator
			drawerContent={Sidebar}
			screenOptions={screenOptions}
			backBehavior="history"
		>
			<Drawer.Screen name="Widget" component={WidgetScreen} options={options} />
			<Drawer.Screen
				name="Collection"
				component={CollectionStack}
				initialParams={{ screen: 'Default' }}
				options={options}
			/>
			<Drawer.Screen
				name="Profile"
				component={ProfileStack}
				initialParams={{ screen: 'Default' }}
				options={options}
			/>
			<Drawer.Screen
				name="Loyalty"
				component={LoyaltyStack}
				options={{ ...options, drawerType: 'back' }}
			/>
		</Drawer.Navigator>
	);
};

const styles = StyleSheet.create({
	drawer: {
		width: sidebarWidth,
	},
});

export default ExplorerStack;
