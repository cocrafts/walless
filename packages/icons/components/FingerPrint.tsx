import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const FingerPrint: FC<IconProps> = ({
	size = 24,
	color = '#FFFFFF',
}) => {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" />
			<Path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" />
			<Path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
			<Path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
			<Path d="M8.65 22c.21-.66.45-1.32.57-2" />
			<Path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
			<Path d="M2 16h.01" />
			<Path d="M21.8 16c.2-2 .131-5.354 0-6" />
			<Path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2" />
		</Svg>
	);
};

export default FingerPrint;
