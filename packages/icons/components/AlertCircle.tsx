import { FC } from 'react';
import { Circle, Line, Svg } from 'react-native-svg';

import { Props } from './types';

export const AlertCircle: FC<Props> = ({ size = 24, color = '#FFFFFF' }) => {
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
			<Circle cx={12} cy={12} r={10} />
			<Line x1={12} y1={8} x2={12} y2={12} />
			<Line x1={12} y1={16} x2={12} y2={16} />
		</Svg>
	);
};
