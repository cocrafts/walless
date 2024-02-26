import type { FC } from 'react';
import { useMemo } from 'react';
import type {
	StackNavigationOptions,
	StackScreenProps,
} from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { withStackContainer } from 'components/StackContainer';
import HistoryScreen from 'screens/Dashboard/History';
import ProfileScreen from 'screens/Dashboard/Home';
import SettingScreen from 'screens/Dashboard/Setting';
import type { ExploreParamList, ProfileParamList } from 'utils/navigation';
import { navigateBack } from 'utils/navigation';

type Props = StackScreenProps<ExploreParamList, 'Profile'>;

const Stack = createStackNavigator<ProfileParamList>();

export const ProfileStack: FC<Props> = () => {
	const screenOptions: StackNavigationOptions = {
		headerShown: false,
	};

	const ManageProfileScreen = useMemo(
		() =>
			withStackContainer(ProfileScreen, {
				title: '',
				headerActive: false,
			}),
		[],
	);

	const ManageHistoryScreen = useMemo(
		() =>
			withStackContainer(HistoryScreen, {
				title: '',
				headerActive: true,
				goBack: navigateBack,
			}),
		[],
	);

	const ManageSettingScreen = useMemo(
		() =>
			withStackContainer(SettingScreen, {
				title: '',
				headerActive: true,
				goBack: navigateBack,
			}),
		[],
	);

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="Default" component={ManageProfileScreen} />
			<Stack.Screen name="Setting" component={ManageSettingScreen} />
			<Stack.Screen name="History" component={ManageHistoryScreen} />
		</Stack.Navigator>
	);
};

export default ProfileStack;
