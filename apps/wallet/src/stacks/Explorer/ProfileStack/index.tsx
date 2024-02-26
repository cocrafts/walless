import type { FC } from 'react';
import { useMemo } from 'react';
import type {
	StackNavigationOptions,
	StackScreenProps,
} from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { withStackContainer } from 'components/StackContainer';
import ProfileScreen from 'screens/Dashboard/Home';
import type { ExploreParamList, ProfileParamList } from 'utils/navigation';

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
				noBottomTabs: false,
			}),
		[],
	);

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="Default" component={ManageProfileScreen} />
		</Stack.Navigator>
	);
};

export default ProfileStack;
