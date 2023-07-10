import type { FC } from 'react';
import { useEffect } from 'react';
import type { ImageSourcePropType, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { AnimatedImage } from '@walless/gui';

interface Props {
	style?: ViewStyle;
	logoSrc: ImageSourcePropType;
	logoSize?: number;
	initialize?: () => Promise<unknown>;
	onReady?: (payload: unknown) => Promise<void>;
}

export const SplashFeature: FC<Props> = ({
	style,
	logoSrc,
	logoSize = 120,
	initialize,
	onReady,
}) => {
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

		Promise.all([initialize?.(), playAnimate()]).then(([response]) => {
			onReady?.(response);
		});
	}, []);

	return (
		<View style={[styles.container, style]}>
			<AnimatedImage source={logoSrc} style={logoStyle} />
		</View>
	);
};

export default SplashFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#011726',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
