import { StyleSheet } from 'react-native';
import { withStackContainer } from '@walless/app';
import { runtime } from '@walless/core';
import type { DrawerNavigationOptions } from 'components/DrawerNavigation';
import { createDrawerNavigator } from 'components/DrawerNavigation';
import CollectibleScreen from 'features/Widget/Collectible';
import CollectionScreen from 'features/Widget/Collection';
import WidgetScreen from 'screens/Dashboard/Widget';
import type { ExploreParamList } from 'utils/navigation';

import Sidebar, { sidebarWidth } from './Sidebar';

const Drawer = createDrawerNavigator<ExploreParamList>();

export const ExplorerStack = () => {
	const screenOptions: DrawerNavigationOptions = {
		headerShown: false,
		drawerStyle: styles.drawer,
		swipeEdgeWidth: 5000,
		swipeMinDistance: sidebarWidth / 3,
		overlayColor: 'transparent',
		drawerType: runtime.isExtension ? 'permanent' : 'back',
	};

	const options = {
		unmountOnBlur: false,
	};

	const ManagedCollectionScreen = withStackContainer(CollectionScreen, {
		title: 'Collection',
	});

	const ManagedCollectibleScreen = withStackContainer(CollectibleScreen, {
		title: 'Collectible',
	});

	return (
		<Drawer.Navigator
			drawerContent={Sidebar}
			screenOptions={screenOptions}
			backBehavior="order"
		>
			<Drawer.Screen name="Widget" component={WidgetScreen} options={options} />
			<Drawer.Screen
				name="Collection"
				component={ManagedCollectionScreen}
				options={options}
			/>
			<Drawer.Screen
				name="Collectible"
				component={ManagedCollectibleScreen}
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
