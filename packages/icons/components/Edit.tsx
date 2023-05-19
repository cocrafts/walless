import { type FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import { type IconProps } from './types';

export const Edit: FC<IconProps> = ({ size = 14, color = '#FFFFFF' }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
			<Path
				d="M7.95001 2.54937L11.4505 6.04997L3.84938 13.6514L0.728442 13.9959C0.31064 14.0421 -0.0423582 13.6888 0.00412498 13.271L0.351382 10.1478L7.95001 2.54937ZM13.6155 2.02819L11.9719 0.384528C11.4592 -0.128176 10.6277 -0.128176 10.115 0.384528L8.56878 1.93084L12.0692 5.43145L13.6155 3.88513C14.1282 3.37215 14.1282 2.54089 13.6155 2.02819Z"
				fill={color}
			/>
		</Svg>
	);
};

export default Edit;
