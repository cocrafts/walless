import { GetProps, Stack, styled } from '@tamagui/core';

export const Circle = styled(Stack, {
	name: 'Circle',
	borderRadius: 10000000,
});

export type CircleProps = GetProps<typeof Circle>;

export { Stack, Text } from '@tamagui/core';
