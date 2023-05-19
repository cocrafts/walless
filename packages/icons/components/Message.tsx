import { type FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import { type IconProps } from './types';

export const Message: FC<IconProps> = ({ size = 12, color = '#FFFFFF' }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
			<Path
				d="M6.05089 0C2.76696 0 0 2.63839 0 5.89554C0 6 0.00267857 12 0.00267857 12L6.05089 11.9946C9.3375 11.9946 12 9.25446 12 5.99732C12 2.74018 9.3375 0 6.05089 0ZM6 9.42857C5.48036 9.42857 4.98482 9.31339 4.54286 9.10446L2.37054 9.64286L2.98393 7.63393C2.72143 7.14911 2.57143 6.59196 2.57143 6C2.57143 4.10625 4.10625 2.57143 6 2.57143C7.89375 2.57143 9.42857 4.10625 9.42857 6C9.42857 7.89375 7.89375 9.42857 6 9.42857Z"
				fill={color}
			/>
		</Svg>
	);
};

export default Message;
