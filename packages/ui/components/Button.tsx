import { type FC, type ReactNode } from 'react';
import { type GetProps, type StackProps, styled } from '@tamagui/core';

import { Stack, Text } from './styled';

export type ButtonProps = StackProps & {
	onPress?: () => void;
	title?: string;
	color?: string;
	fontSize?: number;
	fontWeight?: string;
	children?: ReactNode;
};

export const Button: FC<ButtonProps & ButtonContainerProps> = ({
	onPress,
	children,
	title = 'Button Title',
	color = 'white',
	fontSize = 14,
	fontWeight = '400',
	...props
}) => {
	return (
		<ButtonContainer onPress={() => onPress?.()} {...props}>
			{children || (
				<Text color={color} fontSize={fontSize} fontWeight={fontWeight}>
					{title}
				</Text>
			)}
		</ButtonContainer>
	);
};

export default Button;

export const ButtonContainer = styled(Stack, {
	variants: {
		transparent: {
			true: {
				backgroundColor: 'transparent',
				paddingHorizontal: 0,
			},
		},
		outline: {
			true: {
				backgroundColor: 'transparent',
				borderColor: 'rgba(255, 255, 255, 0.3)',
			},
		},
		disabled: {
			true: {
				backgroundColor: '#202D38',
				disabled: true,
				pointerEvents: 'box-none',
			},
		},
	} as const,
	cursor: 'pointer',
	userSelect: 'none',
	paddingHorizontal: 20,
	paddingVertical: 10,
	borderWidth: 1,
	borderColor: 'transparent',
	borderRadius: 15,
	alignItems: 'center',
	backgroundColor: '#0694D3',
	pressStyle: { opacity: 0.7 },
	hoverStyle: { opacity: 0.8 },
});

type ButtonContainerProps = GetProps<typeof ButtonContainer>;
