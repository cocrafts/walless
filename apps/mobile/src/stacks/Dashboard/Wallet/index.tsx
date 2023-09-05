import type { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WalletNetworkScreen from 'screens/Dashboard/Wallet/Network';
import { screenOptions } from 'utils/navigation';

const Stack = createStackNavigator();

export const WalletStack: FC = () => {
	return (
		<Stack.Navigator screenOptions={screenOptions.navigator}>
			<Stack.Screen
				name="Network"
				component={WalletNetworkScreen}
				options={screenOptions.fade}
			/>
		</Stack.Navigator>
	);
};

export default WalletStack;
