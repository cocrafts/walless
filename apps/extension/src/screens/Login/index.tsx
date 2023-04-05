import { FC, useEffect } from 'react';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import {
	AnimatedImage,
	Button,
	ChevronDownIcon,
	Image,
	Text,
	View,
} from '@walless/ui';
import { resources } from 'utils/config';
import { appActions } from 'utils/state/app';

import Footer from './Footer';
import LoginOption from './LoginOption';

const logoSize = 80;

export const LoginScreen: FC = () => {
	const opacity = useSharedValue(0);
	const logoStyle = useAnimatedStyle(
		() => ({
			width: logoSize,
			height: logoSize,
			opacity: opacity.value,
		}),
		[opacity],
	);

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
							<LoginOption key={id} onPress={appActions.signInGoogle}>
								<Image source={iconSrc} className="w-[27px] h-[27px]" />
							</LoginOption>
						);
					})}
					<LoginOption onPress={appActions.signInGoogle}>
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
