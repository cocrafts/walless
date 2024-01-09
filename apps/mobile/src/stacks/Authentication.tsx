import type { FC } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import CreatePasscodeScreen from 'screens/Authentication/CreatePasscode';
import DeprecatedPasscodeScreen from 'screens/Authentication/DeprecatedPasscode';
import InvitationScreen from 'screens/Authentication/Invitation';
import LoginScreen from 'screens/Authentication/Login';
import RecoveryScreen from 'screens/Authentication/Recovery';
import type { AuthenticationParamList, RootParamList } from 'utils/navigation';
import { screenOptions } from 'utils/navigation';

const Stack = createStackNavigator<AuthenticationParamList>();

type Props = StackScreenProps<RootParamList, 'Authentication'>;

export const AuthenticationStack: FC<Props> = () => {
	return (
		<Stack.Navigator screenOptions={screenOptions.navigator}>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={screenOptions.fade}
			/>
			<Stack.Screen
				name="Invitation"
				component={InvitationScreen}
				options={screenOptions.fade}
			/>
			<Stack.Screen
				name="Recovery"
				component={RecoveryScreen}
				options={screenOptions.bottomFade}
			/>
			<Stack.Screen
				name="CreatePasscode"
				component={CreatePasscodeScreen}
				options={screenOptions.bottomFade}
			/>
			<Stack.Screen
				name="DeprecatedPasscode"
				component={DeprecatedPasscodeScreen}
				options={screenOptions.bottomFade}
			/>
		</Stack.Navigator>
	);
};

export default AuthenticationStack;
