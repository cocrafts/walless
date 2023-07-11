import type { FC } from 'react';
import { Line, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Times: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth="4"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Line x1="18" x2="6" y1="6" y2="18"></Line>
			<Line x1="6" x2="18" y1="6" y2="18"></Line>
		</Svg>
	);
};

export default Times;
