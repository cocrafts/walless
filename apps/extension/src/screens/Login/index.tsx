import { FC, Fragment, useEffect, useState } from 'react';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useNavigate } from 'react-router-dom';
import { TorusLoginResponse } from '@toruslabs/customauth';
import {
	AnimatedImage,
	Button,
	ChevronDownIcon,
	Image,
	Text,
	View,
} from '@walless/ui';
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

import Footer from './Footer';
import LoginOption from './LoginOption';

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
		<View className="flex-1 justify-between items-center bg-gradient-to-b from-[#003356] to-[#011726] px-16 pt-10 pb-2">
			<Image
				source={{ uri: '/img/patterns/login.png' }}
				className="absolute bottom-0 left-0 w-full h-1/2"
			/>

			<View className="w-full flex items-center mb-7">
				<AnimatedImage source={resources.app.smallIcon} style={logoStyle} />

				<Text className="text-white text-xl font-medium mt-9 mb-4">
					Sign in to continue
				</Text>

				<View className="flex-row">
					{loginButtons.map(({ id, iconSrc }) => {
						return (
							<LoginOption key={id} onPress={toggleLogin}>
								<Image source={iconSrc} className="w-[27px] h-[27px]" />
							</LoginOption>
						);
					})}
					<LoginOption onPress={toggleLogin}>
						<ChevronDownIcon size={28} color="white" />
					</LoginOption>
				</View>
			</View>

			<View className="flex items-center mb-2 w-full">
				<View className="flex flex-row items-center mt-8 w-full">
					<View className="flex-1 h-0 border-light border-t " />
					<Text className="mx-4 text-light text-sm">Advanced mode</Text>
					<View className="flex-1 h-0 border-light border-t" />
				</View>

				<Button
					className="w-full mt-2 py-3 px-2 rounded-xl bg-gradient-to-l from-[#4C4C4C] to-[#1F1F1F]"
					title="Create or Import"
					titleClass="text-base text-white text-center"
				/>

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

				<Footer className="mt-7" />
			</View>
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
		id: 'github',
		iconSrc: resources.icons.github,
	},
	{
		id: 'discord',
		iconSrc: resources.icons.discord,
	},
];
