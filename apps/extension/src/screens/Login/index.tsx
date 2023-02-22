import { FC, Fragment, useEffect, useState } from 'react';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { TorusAggregateLoginResponse } from '@toruslabs/customauth';
import { AnimatedImage, IconButton, Text, View } from '@walless/ui';
import { resources } from 'utils/config';
import { useW3a } from 'utils/hook';
import { googleSignIn } from 'utils/w3a';

const logoSize = 80;

export const LoginScreen: FC = () => {
	const [login, setLogin] = useState<TorusAggregateLoginResponse>();
	const opacity = useSharedValue(0);
	const logoStyle = useAnimatedStyle(() => ({
		width: logoSize,
		height: logoSize,
		opacity: opacity.value,
	}));

	useW3a();

	const toggleLogin = async () => {
		const response = await googleSignIn();
		setLogin(response);
		console.log(response, '<--');
	};

	useEffect(() => {
		opacity.value = withTiming(1, { duration: 1000 });
	}, []);

	return (
		<View className="flex-1 items-center pt-24">
			<AnimatedImage
				style={logoStyle}
				source={resources.app.smallIcon}
				resizeMode="contain"
			/>
			<Text className="text-white text-lg font-light mt-12 mb-4">
				Sign in to continue
			</Text>
			<View className="flex-row">
				{loginButtons.map(({ id, iconSrc }) => {
					return (
						<IconButton
							key={id}
							className="mx-2 p-0.5 rounded-2xl"
							source={iconSrc}
							onPress={toggleLogin}
						/>
					);
				})}
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
