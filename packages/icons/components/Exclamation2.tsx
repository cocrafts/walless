import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Exclamation2: FC<IconProps> = ({
	size = 16,
	color = '#FFBE66',
}) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
			<Path
				d="M8.19851 3.52344H7.99681C7.50022 3.52344 7.09766 3.926 7.09766 4.42259V8.72037C7.09766 9.21695 7.50022 9.61952 7.99681 9.61952H8.19851C8.69509 9.61952 9.09766 9.21695 9.09766 8.72037V4.42259C9.09766 3.926 8.69509 3.52344 8.19851 3.52344Z"
				fill={color}
			/>
			<Path
				d="M8.09766 13.0391C8.64994 13.0391 9.09766 12.5913 9.09766 12.0391C9.09766 11.4868 8.64994 11.0391 8.09766 11.0391C7.54537 11.0391 7.09766 11.4868 7.09766 12.0391C7.09766 12.5913 7.54537 13.0391 8.09766 13.0391Z"
				fill={color}
			/>
		</Svg>
	);
};

export default Exclamation2;
