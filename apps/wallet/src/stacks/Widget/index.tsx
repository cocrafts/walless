import { type FC, useMemo } from 'react';
import type { StackNavigationOptions } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import type { DrawerScreenProps } from 'components/DrawerNavigation';
import { withStackContainer } from 'components/StackContainer';
import SettingScreen from 'screens/Dashboard/Setting';
import WidgetScreen from 'screens/Dashboard/Widget';
import {
	type ExploreParamList,
	navigateBack,
	type WidgetParamList,
} from 'utils/navigation';

type Props = DrawerScreenProps<ExploreParamList, 'Widget'>;
const Stack = createStackNavigator<WidgetParamList>();

export const WidgetStack: FC<Props> = () => {
	const screenOptions: StackNavigationOptions = {
		headerShown: false,
	};
	const ManageSettingScreen = useMemo(
		() =>
			withStackContainer(SettingScreen, {
				isHeaderActive: true,
				goBack: navigateBack,
			}),
		[],
	);

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="Default" component={WidgetScreen} />
			<Stack.Screen name="Setting" component={ManageSettingScreen} />
		</Stack.Navigator>
	);
};

export default WidgetStack;
