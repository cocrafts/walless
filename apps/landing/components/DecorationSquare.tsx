import type { FC } from 'react';
import type { StackProps } from '@tamagui/core';
import { Stack } from '@tamagui/core';

type Props = StackProps & {
	size?: number;
};

export const DecorationSquare: FC<Props> = ({
	size = 14,
	backgroundColor = 'rgba(255, 255, 255, 0.2)',
	...stackProps
}) => {
	return (
		<Stack
			width={size}
			height={size}
			backgroundColor={backgroundColor}
			hoverStyle={{ opacity: 0.8, scale: 1.2 }}
			{...stackProps}
		/>
	);
};

export default DecorationSquare;
