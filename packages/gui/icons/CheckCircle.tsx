import { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import { Props } from './types';

export const CheckCircle: FC<Props> = ({ size = 24, color = '#FFFFFF' }) => {
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
			<Path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
			<Path d="m9 12 2 2 4-4" />
		</Svg>
	);
};
