import { FC } from 'react';
import { Path } from 'react-native-svg';

import { Svg } from '../managed';

import { IconProps } from '.';

export const ChevronRightIcon: FC<IconProps> = ({
	className,
	size = 16,
	color = 'black',
}) => {
	return (
		<Svg
			className={className}
			fill={color}
			width={size}
			height={size}
			viewBox="0 0 32 32"
		>
			<Path d="M18.629 15.997l-7.083-7.081L13.462 7l8.997 8.997L13.457 25l-1.916-1.916z" />
		</Svg>
	);
};

export default ChevronRightIcon;
