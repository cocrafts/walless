import { FC, Fragment, useState } from 'react';
import { TorusAggregateLoginResponse } from '@toruslabs/customauth';
import { Text, View } from 'components/managed';
import { useW3a } from 'utils/hook';
import { googleSignIn } from 'utils/w3a';

export const LoginScreen: FC = () => {
	const [login, setLogin] = useState<TorusAggregateLoginResponse>();
	useW3a();

	const toggleLogin = async () => {
		const response = await googleSignIn();
		setLogin(response);
		console.log(response, '<--');
	};

	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-white text-3xl" onPress={toggleLogin}>
				Google Sign-In
			</Text>
			<Text className="text-white mt-3">
				<Text>Created with ❤️ by Metacraft</Text>
			</Text>
			{login?.pubKey && (
				<Fragment>
					<Text className="text-white text-center mt-5">
						{login?.userInfo[0]?.email}
					</Text>
					<Text className="text-white text-xs text-center mt-2">
						{login?.publicAddress}
					</Text>
				</Fragment>
			)}
		</View>
	);
};

export default LoginScreen;
