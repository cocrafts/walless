import { FC, useEffect } from 'react';
import { Image, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { appActions } from 'utils/state/app';

const AnimatedImage = Animated.createAnimatedComponent(Image);

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
				source={{ uri: 'icon.png' }}
				resizeMode="contain"
			/>
		</View>
	);
};

export default SplashScreen;

const logoSize = 150;
