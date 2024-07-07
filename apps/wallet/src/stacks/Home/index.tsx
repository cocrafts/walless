import type { FC } from 'react';
import { useMemo } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { withStackContainer } from 'components/StackContainer';
import HistoryScreen from 'screens/Dashboard/History';
import ProfileScreen from 'screens/Dashboard/Home';
import { noHeaderNavigation } from 'utils/constants';
import type { DashboardParamList, HomeParamList } from 'utils/navigation';
import { navigateBack } from 'utils/navigation';

type Props = StackScreenProps<DashboardParamList, 'Home'>;

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: FC<Props> = () => {
	const ManagedHomeScreen = useMemo(() => {
		return withStackContainer(ProfileScreen, {
			title: 'Home',
		});
	}, []);
	const ManagedHistoryScreen = useMemo(() => {
		return withStackContainer(HistoryScreen, {
			title: 'Transaction History',
			goBack: navigateBack,
		});
	}, []);

	return (
		<Stack.Navigator screenOptions={noHeaderNavigation}>
			<Stack.Screen name="Default" component={ManagedHomeScreen} />
			<Stack.Screen name="History" component={ManagedHistoryScreen} />
		</Stack.Navigator>
	);
};

export default HomeStack;
