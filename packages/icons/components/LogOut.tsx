import { type FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import { type IconProps } from './types';

export const LogOut: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 10 14" fill="none">
			<Path
				d="M6.71429 1H2.14286C1.83975 1 1.54906 1.12877 1.33474 1.35798C1.12041 1.58719 1 1.89807 1 2.22222V10.7778C1 11.1019 1.12041 11.4128 1.33474 11.642C1.54906 11.8712 1.83975 12 2.14286 12H6.71429M9 6.5L6.71429 4.05556M9 6.5L6.71429 8.94444M9 6.5H3.28571"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export default LogOut;
