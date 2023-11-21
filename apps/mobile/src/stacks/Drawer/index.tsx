import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSafeAreaInsets } from '@walless/app';
import WidgetScreen from 'screens/Dashboard/Home/Widget';
import type { HomeParamList } from 'utils/navigation';

import Sidebar, { sidebarWidth } from './Sidebar';

const Drawer = createDrawerNavigator<HomeParamList>();

export const DrawerStack = () => {
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
		</Drawer.Navigator>
	);
};

const styles = StyleSheet.create({
	drawer: {
		width: sidebarWidth,
	},
});

export default DrawerStack;
