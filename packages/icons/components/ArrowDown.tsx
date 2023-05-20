import { type FC } from 'react';
import { Line, Polyline, Svg } from 'react-native-svg';

import { type IconProps } from './types';

export const ArrowDown: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Line x1="12" x2="12" y1="5" y2="19"></Line>
			<Polyline points="19 12 12 19 5 12"></Polyline>
		</Svg>
	);
};

export default ArrowDown;
