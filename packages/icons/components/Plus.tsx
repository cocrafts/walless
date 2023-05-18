import { type FC } from 'react';
import { Line, Svg } from 'react-native-svg';

import { type IconProps } from './types';

export const Plus: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill={color}
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Line x1="12" y1="5" x2="12" y2="19"></Line>
			<Line x1="5" y1="12" x2="19" y2="12"></Line>
		</Svg>
	);
};
