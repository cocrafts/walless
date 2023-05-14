import { type FC } from 'react';
import { Polyline, Svg } from 'react-native-svg';

import { type Props } from './types';

export const Check: FC<Props> = ({ size = 24, color = '#FFFFFF' }) => {
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
			<Polyline points="20 6 9 17 4 12"></Polyline>
		</Svg>
	);
};

export default Check;
