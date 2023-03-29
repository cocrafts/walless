import {
	Anchor as TamaguiAnchor,
	GetProps,
	Stack as TamaguiStack,
	styled,
	Text as TamaguiText,
	XStack as TamaguiXStack,
	YStack as TamaguiYStack,
	ZStack as TamaguiZStack,
} from 'tamagui';

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

export const XStack = TamaguiXStack;
export const YStack = TamaguiYStack;
export const ZStack = TamaguiZStack;

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

export const Anchor = styled(TamaguiAnchor, {
	name: 'Anchor',
	color: '#dedede',
	fontFamily: 'Poppins',
});

export { Button, Image, Input, ScrollView } from 'tamagui';
