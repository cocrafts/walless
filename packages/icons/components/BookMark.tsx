import { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import { Props } from './types';

export const Bookmark: FC<Props> = ({ size = 14, color = '#FFFFFF' }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
			<Path
				d="M2 14V1.3125C2 0.587617 2.55964 0 3.25 0H10.75C11.4404 0 12 0.587617 12 1.3125V14L7 10.9375L2 14Z"
				fill={color}
			/>
		</Svg>
	);
};

export default Bookmark;
