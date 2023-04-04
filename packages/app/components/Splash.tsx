import { FC, useEffect } from 'react';
import { ImageSourcePropType } from 'react-native';
import {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { Stack } from '@walless/gui';

import { AnimatedImage, runOnJS } from './alias';

interface Props {
	logoSrc: ImageSourcePropType;
	initialize?: () => Promise<unknown>;
	onReady?: (payload: unknown) => Promise<void>;
}

export const SplashInner: FC<Props> = ({ logoSrc, initialize, onReady }) => {
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
				const fadeOut = withTiming(0, { duration: 500 }, () =>
					runOnJS(resolve),
				);

				opacity.value = withSequence(fadeIn, fadeOut);
			});
		};

		Promise.all([initialize?.(), playAnimate()]).then(([response]) => {
			onReady?.(response);
		});
	}, []);

	return (
		<Stack
			flex={1}
			backgroundColor="#011726"
			alignItems="center"
			justifyContent="center"
		>
			<AnimatedImage
				key="logo"
				src={logoSrc}
				style={logoStyle}
				width={logoSize}
				height={logoSize}
			/>
		</Stack>
	);
};

export default SplashInner;

const logoSize = 180;
