import type { FC } from 'react';
import { useMemo } from 'react';
import type {
	StackNavigationOptions,
	StackScreenProps,
} from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { withStackContainer } from 'components/StackContainer';
import LoyaltyScreen from 'screens/Dashboard/Loyalty';
import LoyaltyDetailsScreen from 'screens/Dashboard/Loyalty/Details';
import LoyaltyHistoryScreen from 'screens/Dashboard/Loyalty/History';
import type { ExploreParamList, LoyaltyParamList } from 'utils/navigation';
import { navigateBack } from 'utils/navigation';

type Props = StackScreenProps<ExploreParamList, 'Loyalty'>;

const Stack = createStackNavigator<LoyaltyParamList>();

export const LoyaltyStack: FC<Props> = () => {
	const screenOptions: StackNavigationOptions = {
		headerShown: false,
	};

	const ManageLoyaltyScreen = useMemo(
		() =>
			withStackContainer(LoyaltyScreen, {
				title: 'Walless Rewards',
				noBottomTabs: true,
				goBack: navigateBack,
			}),
		[],
	);

	const ManageHistoryScreen = useMemo(
		() =>
			withStackContainer(LoyaltyHistoryScreen, {
				title: 'History',
				noBottomTabs: true,
				goBack: navigateBack,
			}),
		[],
	);

	const ManageDetailsScreen = useMemo(
		() =>
			withStackContainer(LoyaltyDetailsScreen, {
				isHeaderActive: false,
				noBottomTabs: true,
				goBack: navigateBack,
			}),
		[],
	);

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="Default" component={ManageLoyaltyScreen} />
			<Stack.Screen name="History" component={ManageHistoryScreen} />
			<Stack.Screen name="Details" component={ManageDetailsScreen} />
		</Stack.Navigator>
	);
};

export default LoyaltyStack;
