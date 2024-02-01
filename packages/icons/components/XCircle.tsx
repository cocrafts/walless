import type { FC } from 'react';
import { Circle, Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const XCircle: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
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
			<Path d="m15 9-6 6" />
			<Path d="m9 9 6 6" />
		</Svg>
	);
};

export default XCircle;
