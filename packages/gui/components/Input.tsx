import { TextInput } from 'react-native';
import { GetProps, setupReactNative, styled } from '@tamagui/core';
import { focusableInputHOC } from '@tamagui/focusable';

setupReactNative({
	TextInput,
});

export const defaultStyles = {
	fontFamily: 'Rubik',
	borderWidth: 1,
	outlineWidth: 0,
	color: '#FFFFFF',
	focusable: true,
	borderColor: 'grey',
	backgroundColor: 'transparent',
	placeholderTextColor: 'grey',
	borderRadius: 5,
	paddingHorizontal: 10,
	paddingVertical: 5,

	// this fixes a flex bug where it overflows container
	minWidth: 0,

	focusStyle: {
		borderColor: '#FFFFFF',
	},
} as const;

export const InputFrame = styled(
	TextInput,
	{
		name: 'Input',

		variants: {
			unstyled: {
				false: defaultStyles,
			},
		} as const,

		defaultVariants: {
			unstyled: false,
		},
	},
	{
		isInput: true,
	},
);

export type InputProps = GetProps<typeof InputFrame>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Input = focusableInputHOC(InputFrame);
