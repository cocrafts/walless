import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSafeAreaInsets } from '@walless/app';
import ExploreScreen from 'screens/Dashboard/Explore';
import WidgetScreen from 'screens/Dashboard/Home/Widget';

import Sidebar, { sidebarWidth } from './Sidebar';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
	const { top } = useSafeAreaInsets();

	return (
		<Drawer.Navigator
			drawerContent={Sidebar}
			screenOptions={{
				headerShown: false,
				drawerStyle: [
					styles.drawer,
					{
						paddingTop: top,
						backgroundColor: '#131C24',
					},
				],
				overlayColor: 'transparent',
			}}
			backBehavior="order"
			initialRouteName="Explore"
		>
			<Drawer.Screen name="Explore" component={ExploreScreen} />
			<Drawer.Screen name="Widget" component={WidgetScreen} />
		</Drawer.Navigator>
	);
};

const styles = StyleSheet.create({
	drawer: {
		width: sidebarWidth,
	},
});

export default DrawerNavigation;
