import { StyleSheet } from 'react-native';
import type { DrawerNavigationOptions } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { appState, mockWidgets } from '@walless/engine';
import WidgetScreen from 'screens/Dashboard/Widget';
import CollectibleScreen from 'screens/Dashboard/Widget/Collectible';
import { CollectionScreen } from 'screens/Dashboard/Widget/Collection';
import { useSafeAreaInsets } from 'utils/hooks';
import type { ExploreParamList } from 'utils/navigation';

import Header from '../components/Header';

import Sidebar, { sidebarWidth } from './Sidebar';

const Drawer = createDrawerNavigator<ExploreParamList>();

export const DrawerStack = () => {
	const insets = useSafeAreaInsets();

	const screenOptions: DrawerNavigationOptions = {
		header({ navigation }) {
			const widgetName = mockWidgets.find(
				(widget) => widget._id === appState.activeWidgetId,
			)?.name;

			return (
				<Header
					title={widgetName ?? 'Explore'}
					topInset={insets.top}
					showIcon
					toggleDrawer={navigation.toggleDrawer}
				/>
			);
		},
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
