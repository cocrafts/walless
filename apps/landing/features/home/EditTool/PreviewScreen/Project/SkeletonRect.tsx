import { FC } from 'react';
import { Stack } from '@walless/ui';

interface Props {
	width: number | string;
	height: number | string;
}

const SkeletonRect: FC<Props> = ({ width, height }) => {
	const skeletonColor = '#36465480';

	return (
		<Stack
			width={width}
			height={height}
			backgroundColor={skeletonColor}
			borderRadius={100}
		/>
	);
};

export default SkeletonRect;
