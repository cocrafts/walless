import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Heart: FC<IconProps> = ({
	size = 24,
	colors = ['white', 'red'],
}) => {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill={colors[1]}
			stroke={colors[0]}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></Path>
		</Svg>
	);
};
