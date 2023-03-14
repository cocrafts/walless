import { FC } from 'react';
import { Path } from 'react-native-svg';

import { Svg } from '../managed';

import { IconProps } from '.';

export const CheckIcon: FC<IconProps> = ({
	className,
	size = 16,
	color = 'black',
}) => {
	return (
		<Svg
			className={className}
			width={size}
			height={size}
			viewBox="0 0 9 9"
			fill="none"
		>
			<Path d="M1 4.72414L3.33333 7L8 1" stroke={color} strokeLinecap="round" />
		</Svg>
	);
};

export default CheckIcon;
