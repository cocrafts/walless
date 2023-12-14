import type { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootParamList } from 'utils/navigation';
import { screenOptions } from 'utils/navigation';

import AuthenticationStack from './Authentication';
import DashboardStack from './Dashboard';

const Stack = createStackNavigator<RootParamList>();

export const ApplicationStack: FC = () => {
	return (
		<Stack.Navigator screenOptions={screenOptions.navigator}>
			<Stack.Screen
				name="Authentication"
				component={AuthenticationStack}
				options={screenOptions.fade}
			/>
			<Stack.Screen
				name="Dashboard"
				component={DashboardStack}
				options={screenOptions.bottomFade}
			/>
		</Stack.Navigator>
	);
};

export default ApplicationStack;
