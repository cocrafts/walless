import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { DrawerNavigationOptions } from 'components/DrawerNavigation';
import { createDrawerNavigator } from 'components/DrawerNavigation';
import { withStackContainer } from 'components/StackContainer';
import LoyaltyScreen from 'screens/Dashboard/Loyalty';
import WidgetScreen from 'screens/Dashboard/Widget';
import CollectionStack from 'stacks/Explorer/CollectionStack';
import { appState } from 'state/app';
import { useSnapshot } from 'utils/hooks';
import type { ExploreParamList } from 'utils/navigation';
import { navigate } from 'utils/navigation';

import ProfileStack from './ProfileStack';
import Sidebar, { sidebarWidth } from './Sidebar';

const Drawer = createDrawerNavigator<ExploreParamList>();

export const ExplorerStack = () => {
	const { navigationDisplay } = useSnapshot(appState);
	const screenOptions: DrawerNavigationOptions = {
		headerShown: false,
		drawerStyle: styles.drawer,
		swipeEdgeWidth: 100,
		swipeMinDistance: sidebarWidth / 3,
		overlayColor: 'transparent',
		drawerType: navigationDisplay.isPermanentDrawer ? 'permanent' : 'back',
	};

	const options = {
		unmountOnBlur: false,
	};

	const ManageLoyaltyScreen = useMemo(
		() =>
			withStackContainer(LoyaltyScreen, {
				title: 'Walless Rewards',
				noBottomTabs: true,
				goBack: () =>
					navigate('Dashboard', {
						screen: 'Explore',
						params: {
							screen: 'Widget',
							params: { id: 'explorer' },
						},
					}),
			}),
		[],
	);

	return (
		<Drawer.Navigator
			drawerContent={Sidebar}
			screenOptions={screenOptions}
			backBehavior="order"
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
				component={ManageLoyaltyScreen}
				options={{
					...options,
					drawerType: 'back',
				}}
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
