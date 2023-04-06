import { Stack, styled } from '@tamagui/core';

export const ContainerStack = styled(Stack, {
	width: '100%',
	maxWidth: 1280,
	marginHorizontal: 'auto',
	variants: {
		horizontal: {
			true: {
				flexDirection: 'row',
			},
		},
		fullscreen: {
			true: {
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			},
		},
	} as const,
});
