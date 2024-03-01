import type { FC } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { withStackContainer } from 'components/StackContainer';
import ReferralScreen from 'screens/Dashboard/Referral';
import SettingScreen from 'screens/Dashboard/Setting';
import {
	type DashboardParamList,
	navigate,
	type SettingParamList,
} from 'utils/navigation';

type Props = StackScreenProps<DashboardParamList, 'Setting'>;

const Stack = createStackNavigator<SettingParamList>();

export const SettingStack: FC<Props> = () => {
	const screenOptions = { headerShown: false };
	const ManagedSettingScreen = withStackContainer(SettingScreen, {
		title: 'Settings',
	});
	const ManagedReferralScreen = withStackContainer(ReferralScreen, {
		title: 'Referral',
		goBack: () =>
			navigate('Dashboard', {
				screen: 'Setting',
				params: {
					screen: 'Default',
				},
			}),
		scrollEnabled: false,
	});

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="Default" component={ManagedSettingScreen as never} />
			<Stack.Screen name="Referral" component={ManagedReferralScreen} />
		</Stack.Navigator>
	);
};

export default SettingStack;
