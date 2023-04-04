import { FC, ReactNode } from 'react';
import { styled } from '@tamagui/core';

import { Stack, Text } from './styled';

export interface ButtonProps {
	onPress?: () => void;
	title?: string;
	color?: string;
	fontSize?: number;
	children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
	onPress,
	children,
	title = 'Button Title',
	color = 'white',
	fontSize = 14,
}) => {
	return (
		<ButtonContainer onPress={() => onPress?.()}>
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
	cursor: 'pointer',
	userSelect: 'none',
	pressStyle: { opacity: 0.7 },
	hoverStyle: { opacity: 0.8 },
});
