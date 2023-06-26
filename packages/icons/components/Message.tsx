import { type FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import { type IconProps } from './types';

export const Message: FC<IconProps> = ({ size = 12, color = '#FFFFFF' }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
			<Path
				d="M10.8 0H1.2C0.54 0 0.00599999 0.54 0.00599999 1.2L0 12L2.4 9.6H10.8C11.46 9.6 12 9.06 12 8.4V1.2C12 0.54 11.46 0 10.8 0ZM10.8 8.4H1.902L1.548 8.754L1.2 9.102V1.2H10.8V8.4ZM3 5.5H9V6.7H3V5.5ZM3 3H9V4.3H3V3Z"
				fill={color}
			/>
		</Svg>
	);
};

export default Message;
