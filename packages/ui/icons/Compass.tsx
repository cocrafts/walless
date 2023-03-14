import { FC } from 'react';
import { Path } from 'react-native-svg';

import { Svg } from '../managed';

import { IconProps } from '.';

export const CompassIcon: FC<IconProps> = ({
	className,
	size = 14,
	color = 'black',
}) => {
	return (
		<Svg
			className={className}
			width={size}
			height={size}
			viewBox="0 0 15 15"
			fill="none"
		>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15ZM3.19666 11.8037L5.91104 5.91153L11.8032 3.19715L9.08885 9.08934L3.19666 11.8037ZM8.5387 7.35193C8.5387 7.84364 8.14009 8.24226 7.64837 8.24226C7.15665 8.24226 6.75804 7.84364 6.75804 7.35193C6.75804 6.86021 7.15665 6.46159 7.64837 6.46159C8.14009 6.46159 8.5387 6.86021 8.5387 7.35193Z"
				fill={color}
			/>
		</Svg>
	);
};

export default CompassIcon;
