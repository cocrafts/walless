import type { FC } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { withStackContainer } from '@walless/app';
import HistoryScreen from 'screens/Dashboard/History';
import ProfileScreen from 'screens/Dashboard/Home';
import { noHeaderNavigation } from 'utils/helper';
import type { DashboardParamList, HomeParamList } from 'utils/navigation';

type Props = StackScreenProps<DashboardParamList, 'Home'>;

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: FC<Props> = ({ navigation }) => {
	const ManagedHomeScreen = withStackContainer(ProfileScreen, {
		title: 'Home',
	});
	const ManagedHistoryScreen = withStackContainer(HistoryScreen, {
		title: 'Transaction History',
		goBack: navigation.popToTop,
	});

	return (
		<Stack.Navigator screenOptions={noHeaderNavigation}>
			<Stack.Screen name="Default" component={ManagedHomeScreen as never} />
			<Stack.Screen name="History" component={ManagedHistoryScreen} />
		</Stack.Navigator>
	);
};

export default HomeStack;
