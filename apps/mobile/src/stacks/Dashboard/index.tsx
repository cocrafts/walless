import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar, { tabBarHeight } from 'components/TabNavivation/TabBar';
import ExploreScreen from 'screens/Dashboard/Explore';
import ProfileScreen from 'screens/Dashboard/Profile';
import type { DashboardParamList } from 'utils/navigation';

const Tab = createBottomTabNavigator<DashboardParamList>();

export const DashboardStack: FC = () => {
	const screenOptions: BottomTabNavigationOptions = {
		headerShown: false,
	};
	const sceneContainerStyle: StyleProp<ViewStyle> = {
		marginBottom: tabBarHeight,
	};

	return (
		<Tab.Navigator
			screenOptions={screenOptions}
			tabBar={TabBar}
			sceneContainerStyle={sceneContainerStyle}
			initialRouteName="Explore"
		>
			<Tab.Screen name="Explore" component={ExploreScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	);
};

export default DashboardStack;
