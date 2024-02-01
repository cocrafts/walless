import type { FC } from 'react';
import { Circle, Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Search: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
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
			<Circle cx={11} cy={11} r={8} />
			<Path d="m21 21-4.3-4.3" />
		</Svg>
	);
};

export default Search;
