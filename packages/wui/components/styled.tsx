import {
	GetProps,
	Stack as TamaguiStack,
	styled,
	Text as TamaguiText,
	XStack as TamaguiXStack,
	YStack as TamaguiYStack,
	ZStack as TamaguiZStack,
} from 'tamagui';

export const Stack = TamaguiStack;
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

export { Button } from 'tamagui';
