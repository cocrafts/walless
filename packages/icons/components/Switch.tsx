import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Switch: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 17 19" fill="none">
			<Path
				d="M16.2998 12.1249L9.81255 18.6122L9.81255 0.749945L11.5626 0.749945L11.5626 14.3877L15.0626 10.8877L16.2998 12.1249ZM7.18755 18.2499L5.43755 18.2499L5.43756 4.6122L1.93755 8.11219L0.700306 6.87494L7.18756 0.387695L7.18755 18.2499Z"
				fill={color}
			/>
		</Svg>
	);
};

export default Switch;
