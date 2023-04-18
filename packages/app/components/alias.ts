import { Platform } from 'react-native';
import Animated, { runOnJS as originalRunOnJS } from 'react-native-reanimated';
import { Image } from '@walless/ui';

export const AnimatedImage = Animated.createAnimatedComponent(Image);

export const runOnJS = Platform.select({
	default: originalRunOnJS as never,
	/* eslint-disable-next-line */
	web: (cb: any) => cb?.(),
});
