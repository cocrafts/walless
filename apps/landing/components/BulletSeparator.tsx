import { FC } from 'react';
import { type StackProps } from '@tamagui/core';
import { Stack } from '@walless/ui';

type Props = StackProps & {
	noBullet?: boolean;
	bulletWidth?: number;
	bulletHeight?: number;
	lineHeight?: number;
	color?: string;
};

export const BulletSeparator: FC<Props> = ({
	noBullet,
	bulletWidth = 16,
	bulletHeight = 3,
	lineHeight = 1,
	color = '#19A3E1',
	...stackProps
}) => {
	const topOffset = (lineHeight - bulletHeight) / 2;

	return (
		<Stack
			top={-(bulletHeight / 2)}
			height={lineHeight}
			borderRadius={lineHeight / 2}
			backgroundColor="rgba(255, 255, 255, 0.2)"
			{...stackProps}
		>
			{!noBullet && (
				<Stack
					top={topOffset}
					width={bulletWidth}
					height={bulletHeight}
					borderRadius={bulletHeight / 2}
					backgroundColor={color}
				/>
			)}
		</Stack>
	);
};

export default BulletSeparator;
