import { StyleSheet } from 'react-native';
import type { DrawerNavigationOptions } from 'components/DrawerNavigation';
import { createDrawerNavigator } from 'components/DrawerNavigation';
import CollectionStack from 'stacks/Explorer/CollectionStack';
import WidgetStack from 'stacks/Widget';
import { appState } from 'state/app';
import { useSnapshot } from 'utils/hooks';
import type { ExploreParamList } from 'utils/navigation';

import ProfileStack from './ProfileStack';
import Sidebar, { sidebarWidth } from './Sidebar';

const Drawer = createDrawerNavigator<ExploreParamList>();

export const ExplorerStack = () => {
	const { navigationDisplay } = useSnapshot(appState);
	const screenOptions: DrawerNavigationOptions = {
		headerShown: false,
		drawerStyle: styles.drawer,
		swipeEdgeWidth: 5000,
		swipeMinDistance: sidebarWidth / 3,
		overlayColor: 'transparent',
		drawerType: navigationDisplay.isPermanentDrawer ? 'permanent' : 'back',
	};

	const options = {
		unmountOnBlur: false,
	};

	return (
		<Drawer.Navigator
			drawerContent={Sidebar}
			screenOptions={screenOptions}
			backBehavior="order"
		>
			<Drawer.Screen name="Widget" component={WidgetStack} options={options} />
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
		</Drawer.Navigator>
	);
};

const styles = StyleSheet.create({
	drawer: {
		width: sidebarWidth,
	},
});

export default ExplorerStack;
