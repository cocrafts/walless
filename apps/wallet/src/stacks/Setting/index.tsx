import { type FC, useMemo } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { withStackContainer } from 'components/StackContainer';
import ReferralScreen from 'screens/Dashboard/Referral';
import SettingScreen from 'screens/Dashboard/Setting';
import { appState } from 'state/app';
import type { DashboardParamList, SettingParamList } from 'utils/navigation';
import { useSnapshot } from 'valtio';

import { handleGoBackFromReferralScreen } from './utils';

type Props = StackScreenProps<DashboardParamList, 'Setting'>;

const Stack = createStackNavigator<SettingParamList>();

export const SettingStack: FC<Props> = () => {
	const { navigationDisplay } = useSnapshot(appState);

	const screenOptions = { headerShown: false };
	const ManagedSettingScreen = useMemo(() => {
		return withStackContainer(SettingScreen, {
			title: 'Settings',
		});
	}, []);
	const ManagedReferralScreen = useMemo(() => {
		return withStackContainer(ReferralScreen, {
			title: 'Referral',
			noBottomTabs: !navigationDisplay.isBottomTabActive,
			goBack: handleGoBackFromReferralScreen,
		});
	}, []);

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="Default" component={ManagedSettingScreen} />
			<Stack.Screen name="Referral" component={ManagedReferralScreen} />
		</Stack.Navigator>
	);
};

export default SettingStack;
