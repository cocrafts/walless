import { FC, ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { GetProps } from '@tamagui/core';
import { Button, Stack } from '@walless/ui';

import { ActiveHighlight } from './ActiveHighlight';

interface Props {
	size?: number;
	isActive?: boolean;
	activeStyle?: ViewStyle;
	children?: ReactNode;
	onPress?: () => void;
}

export const DashboardButton: FC<Props & ButtonProps> = ({
	size = 36,
	isActive = false,
	activeStyle,
	children,
	...props
}) => {
	const active = isActive ? { ...activeStyle } : {};

	return (
		<Stack alignItems="center">
			{isActive && <ActiveHighlight />}
			<Button
				width={size}
				height={size}
				borderRadius={10}
				backgroundColor={`${isActive ? '#0694D3' : '#243F56'}`}
				padding={0}
				alignContent="center"
				justifyContent="center"
				overflow="hidden"
				hoverStyle={{
					backgroundColor: `${isActive ? '#65B6DA' : '#31485C'}`,
				}}
				{...props}
				{...active}
			>
				{children}
			</Button>
		</Stack>
	);
};

export default DashboardButton;

type ButtonProps = GetProps<typeof Button>;
