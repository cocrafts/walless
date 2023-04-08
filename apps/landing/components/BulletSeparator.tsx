import { FC } from 'react';
import { Stack } from '@walless/gui';

interface Props {
	bulletWidth?: number;
	bulletHeight?: number;
	lineHeight?: number;
	color?: string;
}

export const BulletSeparator: FC<Props> = ({
	bulletWidth = 16,
	bulletHeight = 3,
	lineHeight = 1,
	color = '#19A3E1',
}) => {
	const topOffset = (lineHeight - bulletHeight) / 2;

	return (
		<Stack
			top={-(bulletHeight / 2)}
			height={lineHeight}
			borderRadius={lineHeight / 2}
			backgroundColor="rgba(255, 255, 255, 0.2)"
		>
			<Stack
				top={topOffset}
				width={bulletWidth}
				height={bulletHeight}
				borderRadius={bulletHeight / 2}
				backgroundColor={color}
			/>
		</Stack>
	);
};

export default BulletSeparator;
