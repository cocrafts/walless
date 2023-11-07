import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { mockWidgets } from '@walless/engine';
import Sidebar, { sidebarWidth } from 'components/DrawerNavigation/Sidebar';
import TabBar, { tabBarHeight } from 'components/TabNavivation/TabBar';
import ExploreScreen from 'screens/Dashboard/Explore';
import WidgetScreen from 'screens/Dashboard/Home/Widget';
import ProfileScreen from 'screens/Dashboard/Profile';
import type { DashboardParamList } from 'utils/navigation';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export const DashboardStack = () => {
	const screenOptions: BottomTabNavigationOptions = {
		headerShown: false,
	};
	const sceneContainerStyle: StyleProp<ViewStyle> = {
		marginBottom: tabBarHeight,
	};

	const BottomNavigation: FC<DrawerScreenProps<DashboardParamList>> = ({
		navigation,
	}) => (
		<Tab.Navigator
			screenOptions={screenOptions}
			tabBar={(props) => <TabBar {...props} drawerNavigation={navigation} />}
			sceneContainerStyle={sceneContainerStyle}
		>
			<Tab.Screen name="Explore" component={ExploreScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	);

	return (
		<Drawer.Navigator
			drawerContent={Sidebar}
			screenOptions={{
				headerShown: false,
				drawerStyle: styles.drawer,
				overlayColor: 'transparent',
				drawerType: 'front',
			}}
			backBehavior="order"
		>
			{/* <Drawer.Screen name="BottomNavigation" component={BottomNavigation} /> */}
			{mockWidgets.map((widget) => (
				<Drawer.Screen
					key={widget._id}
					name={widget._id}
					component={WidgetScreen}
				/>
			))}
		</Drawer.Navigator>
	);
};

const styles = StyleSheet.create({
	drawer: {
		width: sidebarWidth,
		backgroundColor: 'transparent',
		marginBottom: tabBarHeight,
	},
});

export default DashboardStack;
