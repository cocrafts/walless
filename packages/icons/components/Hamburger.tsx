import type { FC } from 'react';
import { G, Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Hamburger: FC<IconProps> = ({ size = 18, color = '#FFFFFF' }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
			<G clipPath="url(#clip0_631_4)">
				<Path
					d="M1 3H17M1 9H17M1 15H17"
					stroke={color}
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</G>
		</Svg>
	);
};

export default Hamburger;
