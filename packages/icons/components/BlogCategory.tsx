import type { FC } from 'react';
import { Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const BlogCategory: FC<IconProps> = ({
	size = 24,
	color = '#FFFFFF',
}) => {
	return (
		<Svg width={size} height={(size * 13) / 21} viewBox="0 0 21 13" fill="none">
			<circle cx="6.3913" cy="6.3913" r="6.3913" fill={color} />
			<circle cx="14.6091" cy="6.3913" r="6.3913" fill={color} />
		</Svg>
	);
};

export default BlogCategory;
