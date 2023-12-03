import { StyleSheet } from 'react-native';
import type { DrawerNavigationOptions } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { withStackContainer } from '@walless/app';
import WidgetScreen from 'screens/Dashboard/Widget';
import CollectibleScreen from 'screens/Dashboard/Widget/Collectible';
import { CollectionScreen } from 'screens/Dashboard/Widget/Collection';
import { useSafeAreaInsets } from 'utils/hooks';
import type { ExploreParamList } from 'utils/navigation';

import Sidebar, { sidebarWidth } from './Sidebar';

const Drawer = createDrawerNavigator<ExploreParamList>();

export const ExplorerStack = () => {
	const insets = useSafeAreaInsets();

	const screenOptions: DrawerNavigationOptions = {
		headerShown: false,
		drawerStyle: [
			styles.drawer,
			{
				backgroundColor: '#131C24',
				paddingTop: Math.max(insets.top - 6, 18),
			},
		],
		swipeEdgeWidth: 5000,
		swipeMinDistance: sidebarWidth / 3,
		overlayColor: 'transparent',
		drawerType: 'back',
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
