import { FC } from 'react';
import { Path } from 'react-native-svg';

import { Svg } from '../managed';

import { IconProps } from '.';

export const ChevronDownIcon: FC<IconProps> = ({
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
				d="M6 9L11.7874 14.7874V14.7874C11.9048 14.9048 12.0952 14.9048 12.2126 14.7874V14.7874L18 9"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export default ChevronDownIcon;
