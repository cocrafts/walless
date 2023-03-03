import { FC, Fragment, useEffect, useState } from 'react';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useNavigate } from 'react-router-dom';
import { TorusAggregateLoginResponse } from '@toruslabs/customauth';
import { AnimatedImage, Button, IconButton, Text, View } from '@walless/ui';
import { resources } from 'utils/config';
import { useW3a } from 'utils/hook';
import { googleSignIn } from 'utils/w3a';
import { triggerLogin } from 'utils/w3a-v2';

const logoSize = 80;

export const LoginScreen: FC = () => {
	const navigate = useNavigate();
	const [login, setLogin] = useState<TorusAggregateLoginResponse>();
	const opacity = useSharedValue(0);
	const logoStyle = useAnimatedStyle(() => ({
		width: logoSize,
		height: logoSize,
		opacity: opacity.value,
	}));

	useW3a();

	const toggleLogin = async () => {
		const response = await triggerLogin();
		// const response = await googleSignIn();
		setLogin(response);
		console.log(response, '<--');
	};

	useEffect(() => {
		if (login?.pubKey) {
			navigate('/passcode');
		}
	}, [login]);

	useEffect(() => {
		opacity.value = withTiming(1, { duration: 1000 });
	}, []);

	return (
		<View className="flex-1 items-center justify-center bg-color-6 px-12">
			<AnimatedImage
				style={logoStyle}
				source={resources.app.smallIcon}
				resizeMode="contain"
			/>
			<Text className="text-white text-xl font-light mt-12 mb-4">
				Sign in to continue
			</Text>
			<View className="flex-row">
				{loginButtons.map(({ id, iconSrc }) => {
					return (
						<IconButton
							key={id}
							className="mx-2 p-1 rounded-xl bg-gradient-to-b from-color-4 to-color-3 border border-dark"
							source={iconSrc}
							onPress={toggleLogin}
						/>
					);
				})}
			</View>
			<Text className="text-light mt-6 text-sm">or</Text>
			<View className="flex flex-row items-center mt-6 w-full">
				<View className="flex-1 h-0 border-light border-t " />
				<Text className="mx-4 text-light text-sm">External Wallet</Text>
				<View className="flex-1 h-0 border-light border-t" />
			</View>
			<View className="mt-2 w-full">
				<Button
					className="py-3 px-2 rounded-xl bg-gradient-to-r from-coal-start to-coal-end"
					title="Continue with Wallet"
					titleClass="text-base text-white text-center"
				/>
			</View>
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

const loginButtons = [
	{
		id: 'google',
		iconSrc: resources.icons.google,
	},
	{
		id: 'facebook',
		iconSrc: resources.icons.facebook,
	},
	{
		id: 'discord',
		iconSrc: resources.icons.discord,
	},
];
