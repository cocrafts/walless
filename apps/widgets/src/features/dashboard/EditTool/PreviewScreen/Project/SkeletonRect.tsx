import type { FC } from 'react';
import { View } from '@walless/gui';

interface Props {
	width: number | string;
	height: number | string;
}

const SkeletonRect: FC<Props> = ({ width, height }) => {
	const skeletonColor = '#36465480';

	return (
		<View
			style={{
				width: width,
				height: height,
				backgroundColor: skeletonColor,
				borderRadius: 100,
			}}
		/>
	);
};

export default SkeletonRect;
