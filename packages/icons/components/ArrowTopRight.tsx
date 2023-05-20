import { type FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import { type IconProps } from './types';

export const ArrowTopRight: FC<IconProps> = ({
	size = 24,
	color = '#FFFFFF',
}) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M13.7786 8.62136L6.30886 8.64017L6.31458 6.37172L17.6569 6.34314L17.6283 17.6854L15.3598 17.6911L15.3786 10.2214L7.14315 18.4569L5.54315 16.8569L13.7786 8.62136Z"
				fill={color}
			/>
		</Svg>
	);
};

export default ArrowTopRight;
