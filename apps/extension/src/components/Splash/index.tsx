import { FC, useEffect } from 'react';
import {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { AnimatedImage, View } from '@walless/ui';
import { resources } from 'utils/config';
import { appActions } from 'utils/state/app';

export const SplashScreen: FC = () => {
	const opacity = useSharedValue(0);

	const logoStyle = useAnimatedStyle(() => ({
		width: logoSize,
		height: logoSize,
		opacity: opacity.value,
	}));

	useEffect(() => {
		const playAnimate = async (): Promise<void> => {
			return new Promise((resolve) => {
				const fadeIn = withTiming(1, { duration: 500 });
				const fadeOut = withTiming(0, { duration: 500 }, () => {
					resolve();
				});

				opacity.value = withSequence(fadeIn, fadeOut);
			});
		};

		Promise.all([appActions.bootstrap(), playAnimate()]).then(
			([bootstrapResponse]) => appActions.launchApp(bootstrapResponse),
		);
	}, []);

	return (
		<View className="flex-1 items-center justify-center">
			<AnimatedImage
				style={logoStyle}
				source={resources.app.icon}
				resizeMode="contain"
			/>
		</View>
	);
};

export default SplashScreen;

const logoSize = 220;
