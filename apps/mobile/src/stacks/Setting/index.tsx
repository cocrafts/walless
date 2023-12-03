import type { FC } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { withStackContainer } from '@walless/app';
import SettingScreen from 'screens/Dashboard/Setting';
import type { DashboardParamList, SettingParamList } from 'utils/navigation';

type Props = StackScreenProps<DashboardParamList, 'Setting'>;

const Stack = createStackNavigator<SettingParamList>();

export const SettingStack: FC<Props> = () => {
	const screenOptions = { headerShown: false };
	const ManagedSettingScreen = withStackContainer(SettingScreen, {
		title: 'Settings',
	});

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="Default" component={ManagedSettingScreen as never} />
		</Stack.Navigator>
	);
};

export default SettingStack;
