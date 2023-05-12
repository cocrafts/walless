import { type FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import { type Props } from './types';

export const Swap: FC<Props> = ({ size = 24, color = '#FFFFFF' }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M21 7.5L8 7.5M21 7.5L16.6667 3M21 7.5L16.6667 12"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M4 16.5L17 16.5M4 16.5L8.33333 21M4 16.5L8.33333 12"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export default Swap;
