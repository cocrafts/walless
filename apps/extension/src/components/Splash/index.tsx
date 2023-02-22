import { FC, useEffect } from 'react';
import { View } from 'react-native';
import {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { AnimatedImage } from 'components/animated';
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
		const fadeIn = withTiming(1, { duration: 500 });
		const fadeOut = withTiming(0, { duration: 500 }, () => {
			appActions.setLoading(false);
		});

		opacity.value = withSequence(fadeIn, fadeOut);
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

const logoSize = 160;
