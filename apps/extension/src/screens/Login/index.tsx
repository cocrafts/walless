import { FC, Fragment, useEffect, useState } from 'react';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useNavigate } from 'react-router-dom';
import { TorusLoginResponse } from '@toruslabs/customauth';
import { AnimatedImage, Button, IconButton, Text, View } from '@walless/ui';
import { resources } from 'utils/config';
import { getAllPrivateKey } from 'utils/indexDB';
import {
	getAllPrivateKeys,
	googleSignIn,
	initAfterLogin,
	inputPasscode,
	reconstructKey,
	w3aSignal,
} from 'utils/w3a-v3';

const logoSize = 80;

export const LoginScreen: FC = () => {
	const navigate = useNavigate();
	const [login, setLogin] = useState<TorusLoginResponse>();
	const opacity = useSharedValue(0);
	const logoStyle = useAnimatedStyle(() => ({
		width: logoSize,
		height: logoSize,
		opacity: opacity.value,
	}));

	const toggleLogin = async () => {
		const response = await googleSignIn();
		const w3aStatus: w3aSignal = await initAfterLogin();
		console.log(w3aStatus);
		console.log('Hello world');
		if (w3aStatus == w3aSignal.RECONSTRUCT_KEY_SUCCESS) {
			navigate('/explore');
		} else if (w3aStatus == w3aSignal.REQUIRE_INIT_PASSCODE) {
			navigate('/passcode');
		} else if (w3aStatus == w3aSignal.REQUIRE_INPUT_PASSCODE) {
			const inputPasscodeStatus = await inputPasscode('123456');
			if (inputPasscodeStatus == w3aSignal.WRONG_PASSCODE) {
				console.log('Wrong passcode');
			} else if (inputPasscodeStatus == w3aSignal.INPUT_PASSCODE_SUCCESS) {
				console.log('Success');
				const reconstructKeyStatus = await reconstructKey();
				console.log(reconstructKeyStatus);
				console.log(await getAllPrivateKeys());
			}
		} else {
			console.log(w3aStatus);
		}
		setLogin(response);
	};

	useEffect(() => {
		const func = async () => {
			console.log(await getAllPrivateKey());
		};

		func();
	}, []);

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
						{login?.userInfo?.email}
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
