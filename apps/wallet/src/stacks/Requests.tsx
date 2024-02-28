import type { FC } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import RequestConnect from 'screens/Requests/Connect';
import RequestSignature from 'screens/Requests/Signature';
import type { RequestsParamList, RootParamList } from 'utils/navigation';
import { screenOptions } from 'utils/navigation';

const Stack = createStackNavigator<RequestsParamList>();

type Props = StackScreenProps<RootParamList, 'Requests'>;

export const RequestsStack: FC<Props> = () => {
	return (
		<Stack.Navigator screenOptions={screenOptions.navigator}>
			<Stack.Screen
				name="RequestConnect"
				component={RequestConnect}
				options={screenOptions.fade}
			/>
			<Stack.Screen
				name="RequestSignature"
				component={RequestSignature}
				options={screenOptions.fade}
			/>
		</Stack.Navigator>
	);
};

export default RequestsStack;
