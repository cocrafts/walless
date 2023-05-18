import { type FC } from 'react';
import { Path, Rect, Svg } from 'react-native-svg';

import { type IconProps } from './types';

export const Copy: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
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
			<Rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
			<Path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
		</Svg>
	);
};

export default Copy;
