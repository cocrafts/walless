import { type FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import { type IconProps } from './types';

export const ArrowBottomRight: FC<IconProps> = ({
	size = 24,
	color = '#FFFFFF',
}) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M15.3787 13.7786L15.3598 6.30886L17.6283 6.31457L17.6569 17.6569L6.31459 17.6283L6.30887 15.3598L13.7787 15.3786L5.54316 7.14314L7.14316 5.54314L15.3787 13.7786Z"
				fill={color}
			/>
		</Svg>
	);
};

export default ArrowBottomRight;
