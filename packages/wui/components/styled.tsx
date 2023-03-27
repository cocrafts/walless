import { GetProps, Stack, styled, Text as TamaguiText } from '@tamagui/core';

export const Circle = styled(Stack, {
	name: 'Circle',
	borderRadius: 10000000,
});

export type CircleProps = GetProps<typeof Circle>;

export { Stack } from '@tamagui/core';

export const Text = styled(TamaguiText, {
	name: 'Text',
	color: '#dedede',
	fontFamily: 'Poppins',
});
