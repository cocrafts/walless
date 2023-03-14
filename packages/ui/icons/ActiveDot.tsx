import { FC } from 'react';
import { Circle } from 'react-native-svg';

import { Svg } from '../managed';

import { IconProps } from '.';

export const ActiveDotIcon: FC<IconProps> = ({
	className,
	size = 16,
	color = '#4DE2A4',
}) => {
	return (
		<Svg
			className={className}
			width={size}
			height={size}
			viewBox="0 0 5 5"
			fill="none"
		>
			<Circle cx="2.5" cy="2.5" r="2.5" fill={color} fillOpacity="0.5" />
			<Circle cx="2.50024" cy="2.50056" r="1.78571" fill={color} />
		</Svg>
	);
};

export default ActiveDotIcon;
