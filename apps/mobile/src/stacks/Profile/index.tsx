import type { FC } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from 'screens/Dashboard/Profile';
import SettingScreen from 'screens/Dashboard/Setting';
import type { DashboardParamList, ProfileParamList } from 'utils/navigation';

type Props = StackScreenProps<DashboardParamList, 'Profile'>;

const Stack = createStackNavigator<ProfileParamList>();

export const ProfileStack: FC<Props> = () => {
	const screenOptions = {
		headerShown: false,
	};

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="ProfileDashboard" component={ProfileScreen} />
			<Stack.Screen name="Setting" component={SettingScreen} />
		</Stack.Navigator>
	);
};

export default ProfileStack;
