import { FC } from 'react';
import { Rect } from 'react-native-svg';

import { Svg } from '../managed';

import { IconProps } from '.';

export const ThreeDots: FC<IconProps> = ({
	className,
	size = 15,
	color = 'black',
}) => {
	const height = (size * 3) / 15;

	return (
		<Svg
			className={className}
			width={size}
			height={height}
			viewBox="0 0 15 3"
			fill="none"
		>
			<Rect width="2.29412" height="2.29412" rx="1.14706" fill={color} />
			<Rect
				x="6.35303"
				width="2.29412"
				height="2.29412"
				rx="1.14706"
				fill={color}
			/>
			<Rect
				x="12.7061"
				width="2.29412"
				height="2.29412"
				rx="1.14706"
				fill={color}
			/>
		</Svg>
	);
};

export default ThreeDots;
