import type { FC } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { withStackContainer } from 'components/StackContainer';
import ReferralScreen from 'screens/Dashboard/Referral';
import SettingScreen from 'screens/Dashboard/Setting';
import type { DashboardParamList, SettingParamList } from 'utils/navigation';

import { handleGoBackFromReferralScreen } from './utils';

type Props = StackScreenProps<DashboardParamList, 'Setting'>;

const Stack = createStackNavigator<SettingParamList>();

export const SettingStack: FC<Props> = () => {
	const screenOptions = { headerShown: false };
	const ManagedSettingScreen = withStackContainer(SettingScreen, {
		title: 'Settings',
	});
	const ManagedReferralScreen = withStackContainer(ReferralScreen, {
		title: 'Referral',
		goBack: handleGoBackFromReferralScreen,
	});

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="Default" component={ManagedSettingScreen as never} />
			<Stack.Screen name="Referral" component={ManagedReferralScreen} />
		</Stack.Navigator>
	);
};

export default SettingStack;
