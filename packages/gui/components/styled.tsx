import Animated from 'react-native-reanimated';
import {
	GetProps,
	Stack as TamaguiStack,
	styled,
	Text as TamaguiText,
} from '@tamagui/core';
import { Image } from '@tamagui/image';

export const Stack = styled(TamaguiStack, {
	variants: {
		fullscreen: {
			true: {
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			},
		},
		horizontal: {
			true: {
				flexDirection: 'row',
			},
		},
	} as const,
});

export const Circle = styled(TamaguiStack, {
	name: 'Circle',
	borderRadius: 10000000,
});

export type CircleProps = GetProps<typeof Circle>;

export const Text = styled(TamaguiText, {
	name: 'Text',
	color: '#dedede',
	fontFamily: 'Poppins',
});

export { Button } from '@tamagui/button';
export { Image } from '@tamagui/image';
export { ScrollView } from '@tamagui/scroll-view';

export const AnimatedImage = Animated.createAnimatedComponent(Image);
