import type { FC } from 'react';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import WidgetScreen from 'screens/Dashboard/Home/Widget';
import type { DashboardParamList, HomeParamList } from 'utils/navigation';
import { screenOptions } from 'utils/navigation';

const Stack = createStackNavigator<HomeParamList>();

type Props = BottomTabScreenProps<DashboardParamList, 'Home'>;

export const HomeStack: FC<Props> = () => {
	return (
		<Stack.Navigator screenOptions={screenOptions.navigator}>
			<Stack.Screen
				name="Widget"
				component={WidgetScreen}
				options={screenOptions.fade}
			/>
		</Stack.Navigator>
	);
};

export default HomeStack;
