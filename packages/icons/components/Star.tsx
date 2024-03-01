import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Star: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
			<Path
				d="M6 9.21217L8.90991 10.9003C9.44281 11.2096 10.0949 10.7523 9.95468 10.1739L9.18337 6.9995L11.7567 4.86081C12.2265 4.47073 11.9741 3.73094 11.357 3.68386L7.97033 3.40812L6.64509 0.40857C6.40669 -0.13619 5.59331 -0.13619 5.35491 0.40857L4.02967 3.40139L0.642956 3.67713C0.025914 3.72421 -0.226512 4.46401 0.243281 4.85408L2.81663 6.99277L2.04532 10.1672C1.90509 10.7456 2.55719 11.2029 3.09009 10.8935L6 9.21217Z"
				fill={color}
			/>
		</Svg>
	);
};

export default Star;
