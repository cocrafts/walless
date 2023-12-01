import type { FC } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import SettingScreen from 'screens/Dashboard/Setting';
import type { DashboardParamList, SettingParamList } from 'utils/navigation';

type Props = StackScreenProps<DashboardParamList, 'Setting'>;

const Stack = createStackNavigator<SettingParamList>();

export const SettingStack: FC<Props> = () => {
	const screenOptions = {
		headerShown: false,
	};

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="Default" component={SettingScreen} />
		</Stack.Navigator>
	);
};

export default SettingStack;
