import { FC, ReactNode } from 'react';
import { GetProps, styled } from '@tamagui/core';

import { Stack, Text } from './styled';

export interface ButtonProps {
	onPress?: () => void;
	title?: string;
	color?: string;
	fontSize?: number;
	children?: ReactNode;
}

export const Button: FC<ButtonProps & ButtonContainerProps> = ({
	onPress,
	children,
	title = 'Button Title',
	color = 'white',
	fontSize = 14,
	...props
}) => {
	return (
		<ButtonContainer onPress={() => onPress?.()} {...props}>
			{children || (
				<Text color={color} fontSize={fontSize}>
					{title}
				</Text>
			)}
		</ButtonContainer>
	);
};

export default Button;

export const ButtonContainer = styled(Stack, {
	variants: {
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
	borderRadius: 15,
	alignItems: 'center',
	backgroundColor: '#0694D3',
	pressStyle: { opacity: 0.7 },
	hoverStyle: { opacity: 0.8 },
});

type ButtonContainerProps = GetProps<typeof ButtonContainer>;
