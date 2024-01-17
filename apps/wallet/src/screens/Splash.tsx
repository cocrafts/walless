import type { FC } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { AnimatedImage } from '@walless/gui';
import { appActions } from 'state/app';
import assets from 'utils/assets';

const logoSize = 120;

export const SplashScreen: FC = () => {
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
		const playAnimate = async (): Promise<void> => {
			return new Promise((resolve) => {
				const fadeIn = withTiming(1, { duration: 500 });
				const fadeOut = withTiming(0, { duration: 500 }, () => {
					runOnJS(resolve)();
				});

				opacity.value = withSequence(fadeIn, fadeOut);
			});
		};

		Promise.all([appActions.bootstrap(), playAnimate()]).then(() => {
			appActions.launchApp();
		});
	}, []);

	return (
		<View style={styles.container}>
			<AnimatedImage source={assets.misc.walless} style={logoStyle} />
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#011726',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
