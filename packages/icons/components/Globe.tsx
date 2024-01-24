import type { FC } from 'react';
import { Circle, Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Globe: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
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
			<Path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
			<Path d="M2 12h20" />
		</Svg>
	);
};

export default Globe;
