import type { FC } from 'react';
import { Line, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Menu: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
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
			<Line x1="3" x2="21" y1="6" y2="6" />
			<Line x1="3" x2="21" y1="12" y2="12" />
			<Line x1="3" x2="21" y1="18" y2="18" />
		</Svg>
	);
};

export default Menu;
