import type { FC } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryScreen from 'screens/Dashboard/History';
import ProfileScreen from 'screens/Dashboard/Profile';
import type { DashboardParamList, HomeParamList } from 'utils/navigation';

type Props = StackScreenProps<DashboardParamList, 'Home'>;

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: FC<Props> = () => {
	const screenOptions = {
		headerShown: false,
	};

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="Default" component={ProfileScreen} />
			<Stack.Screen name="History" component={HistoryScreen} />
		</Stack.Navigator>
	);
};

export default HomeStack;
