import type { FC } from 'react';
import type {
	StackNavigationOptions,
	StackScreenProps,
} from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryScreen from 'screens/Dashboard/History';
import ProfileScreen from 'screens/Dashboard/Home';
import { useSafeAreaInsets } from 'utils/hooks';
import type { DashboardParamList, HomeParamList } from 'utils/navigation';

import Header from '../components/Header';

type Props = StackScreenProps<DashboardParamList, 'Home'>;

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: FC<Props> = () => {
	const insets = useSafeAreaInsets();

	const getScreenOptions = (
		screenName: string,
		canGoBack: boolean = false,
	): StackNavigationOptions => ({
		header({ navigation }) {
			return (
				<Header
					title={screenName}
					topInset={insets.top}
					showIcon={canGoBack}
					goBack={navigation.goBack}
				/>
			);
		},
	});

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Default"
				component={ProfileScreen}
				options={getScreenOptions('Home')}
			/>
			<Stack.Screen
				name="History"
				component={HistoryScreen}
				options={getScreenOptions('Transaction History', true)}
			/>
		</Stack.Navigator>
	);
};

export default HomeStack;
