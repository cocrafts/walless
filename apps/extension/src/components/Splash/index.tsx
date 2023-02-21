import { FC, useEffect } from 'react';
import { Image, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { appActions } from 'utils/state/app';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const SplashScreen: FC = () => {
	const opacity = useSharedValue(0);
	const raise = useSharedValue(50);

	const logoStyle = useAnimatedStyle(() => ({
		width: logoSize,
		height: logoSize,
		opacity: opacity.value,
		transform: [{ translateY: raise.value }],
	}));

	useEffect(() => {
		const fadeAnimation = async (): Promise<void> => {
			return new Promise((resolve) => {
				opacity.value = withTiming(1, { duration: 1000 }, () => {
					resolve();
				});
			});
		};

		const raiseAnimation = async (): Promise<void> => {
			return new Promise((resolve) => {
				raise.value = withSpring(0, {}, () => {
					resolve();
				});
			});
		};

		Promise.all([fadeAnimation(), raiseAnimation()]).then(() => {
			opacity.value = withTiming(0, { duration: 400 }, () => {
				appActions.setLoading(false);
			});
		});
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
