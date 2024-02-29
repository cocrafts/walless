import type { FC } from 'react';
import { Path, Rect, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Lock: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
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
			<Rect width={18} height={11} x={3} y={11} rx={2} ry={2} />
			<Path d="M7 11V7a5 5 0 0 1 10 0v4" />
		</Svg>
	);
};

export default Lock;
