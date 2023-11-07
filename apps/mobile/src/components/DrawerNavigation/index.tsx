import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSafeAreaInsets } from '@walless/app';
import WidgetScreen from 'screens/Dashboard/Home/Widget';

import Sidebar, { sidebarWidth } from './Sidebar';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
	const { top } = useSafeAreaInsets();

	const screenOptions = {
		headerShown: false,
		drawerStyle: [
			styles.drawer,
			{
				paddingTop: top,
				backgroundColor: '#131C24',
			},
		],
		overlayColor: 'transparent',
	};

	const options = {
		unmountOnBlur: false,
	};

	return (
		<Drawer.Navigator
			drawerContent={Sidebar}
			screenOptions={screenOptions}
			backBehavior="order"
			initialRouteName="Explore"
		>
			<Drawer.Screen name="Widget" component={WidgetScreen} options={options} />
		</Drawer.Navigator>
	);
};

const styles = StyleSheet.create({
	drawer: {
		width: sidebarWidth,
	},
});

export default DrawerNavigation;
