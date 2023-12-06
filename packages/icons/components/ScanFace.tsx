import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const ScanFace: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
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
			<Path d="M3 7V5a2 2 0 0 1 2-2h2" />
			<Path d="M17 3h2a2 2 0 0 1 2 2v2" />
			<Path d="M21 17v2a2 2 0 0 1-2 2h-2" />
			<Path d="M7 21H5a2 2 0 0 1-2-2v-2" />
			<Path d="M8 14s1.5 2 4 2 4-2 4-2" />
			<Path d="M9 9h.01" />
			<Path d="M15 9h.01" />
		</Svg>
	);
};

export default ScanFace;
