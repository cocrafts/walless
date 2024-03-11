import type { FC } from 'react';
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Kite: FC<IconProps & { opacity?: 0.5 }> = ({
	size = 11,
	color = '#ffffff',
}) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 17 17" fill="none">
			<G clipPath="url(#clip0_12459_6460)">
				<Path
					d="M6.53949 13.7889L12.0602 6.25919C12.1174 6.18155 12.1505 6.08882 12.1554 5.99252C12.1603 5.89622 12.1368 5.8006 12.0878 5.71756C12.0387 5.63452 11.9664 5.56771 11.8797 5.52546C11.7931 5.48321 11.6959 5.46737 11.6003 5.47992L2.34019 6.67378C2.25972 6.68363 2.18297 6.71337 2.11687 6.7603C2.05077 6.80723 1.99739 6.86987 1.96154 6.94259C1.9257 7.0153 1.90853 7.0958 1.91157 7.17681C1.91461 7.25782 1.93777 7.3368 1.97896 7.40662L3.12703 9.36154C3.25201 9.5733 3.5162 9.66292 3.74295 9.56336L10.1997 6.83189L4.6853 11.16C4.49103 11.3146 4.44181 11.5892 4.56679 11.801L5.72334 13.7509C5.90081 14.0516 6.33246 14.0767 6.53949 13.7889Z"
					fill={color}
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_12459_6460">
					<Rect
						width="11.8027"
						height="11.8027"
						fill={color}
						transform="translate(0 5.99902) rotate(-30.5489)"
					/>
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export default Kite;
