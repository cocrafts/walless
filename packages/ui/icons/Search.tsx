import { FC } from 'react';
import { Path } from 'react-native-svg';

import { Svg } from '../managed';

import { defaultIconProps, IconProps } from '.';

export const SearchIcon: FC<IconProps> = (
	{ className, size, color } = { ...defaultIconProps },
) => {
	return (
		<Svg
			className={className}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
		>
			<Path
				opacity={0.1}
				d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
				fill={color}
			/>
			<Path
				d="m15 15 6 6"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
				stroke={color}
				strokeWidth={2}
			/>
		</Svg>
	);
};

export default SearchIcon;
