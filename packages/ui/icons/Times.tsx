import { FC } from 'react';
import { Path } from 'react-native-svg';

import { Svg } from '../managed';

import { IconProps } from '.';

export const TimesIcon: FC<IconProps> = ({
	className,
	size = 16,
	color = 'black',
}) => {
	return (
		<Svg
			className={className}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
		>
			<Path
				d="M16 8L8 16M8 8L16 16"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</Svg>
	);
};

export default TimesIcon;
