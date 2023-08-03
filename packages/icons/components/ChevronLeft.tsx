import type { FC } from 'react';
import { Polyline, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const ChevronLeft: FC<IconProps> = ({
	size = 24,
	color = '#FFFFFF',
}) => {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Polyline points="15 18 9 12 15 6" />
		</Svg>
	);
};

export default ChevronLeft;
