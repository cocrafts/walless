import {
	GetProps,
	Stack as TamaguiStack,
	styled,
	Text as TamaguiText,
} from '@tamagui/core';

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
	fontFamily: 'Rubik',
});

export { ScrollView } from '@tamagui/scroll-view';
