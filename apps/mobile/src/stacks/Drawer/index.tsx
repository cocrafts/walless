import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CollectibleScreen from 'screens/Dashboard/Home/Collectible';
import { CollectionScreen } from 'screens/Dashboard/Home/Collection';
import WidgetScreen from 'screens/Dashboard/Home/Widget';
import type { ExploreParamList } from 'utils/navigation';

import Sidebar, { sidebarWidth } from './Sidebar';

const Drawer = createDrawerNavigator<ExploreParamList>();

export const DrawerStack = () => {
	const screenOptions = {
		headerShown: false,
		drawerStyle: [
			styles.drawer,
			{
				backgroundColor: '#131C24',
			},
		],
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
			<Drawer.Screen name="Widget" component={WidgetScreen} options={options} />
			<Drawer.Screen
				name="Collection"
				component={CollectionScreen}
				options={options}
			/>
			<Drawer.Screen
				name="Collectible"
				component={CollectibleScreen}
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

export default DrawerStack;
