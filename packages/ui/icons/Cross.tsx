import { FC } from 'react';
import { Path } from 'react-native-svg';

import { Svg } from '../managed';

import { IconProps } from '.';

export const CrossIcon: FC<IconProps> = ({
	className,
	size = 14,
	color = 'black',
}) => {
	return (
		<Svg
			className={className}
			width={size}
			height={size}
			viewBox="0 0 14 14"
			fill="none"
		>
			<Path
				fill={color}
				d="M6.06498 13.545V7.93462H0.45459V6.06449H6.06498V0.454102H7.93511V6.06449H13.5455V7.93462H7.93511V13.545H6.06498Z"
			/>
		</Svg>
	);
};

export default CrossIcon;
