import type { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSnapshot } from '@walless/app';
import { appState } from '@walless/engine';
import SplashScreen from 'screens/Splash';
import type { RootParamList } from 'utils/navigation';
import { screenOptions } from 'utils/navigation';

import AuthenticationStack from './Authentication';
import DashboardStack from './Dashboard';

const Stack = createStackNavigator<RootParamList>();

export const ApplicationStack: FC = () => {
	const { profileLoading, profileReady } = useSnapshot(appState);

	if (profileLoading) {
		return <SplashScreen />;
	}

	return (
		<Stack.Navigator screenOptions={screenOptions.navigator}>
			{profileReady && (
				<Stack.Screen
					name="Dashboard"
					component={DashboardStack}
					options={screenOptions.bottomFade}
				/>
			)}

			<Stack.Screen
				name="Authentication"
				navigationKey={profileReady ? 'authed' : 'anoymous'}
				component={AuthenticationStack}
				options={screenOptions.fade}
			/>
		</Stack.Navigator>
	);
};

export default ApplicationStack;
