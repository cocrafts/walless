import { type FC } from 'react';
import { Circle, Path, Svg } from 'react-native-svg';

import { type Props } from './types';

export const Compass: FC<Props> = ({ size = 24, color = '#FFFFFF' }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 19 19" fill="none">
			<Circle cx={9.5} cy={9.5} r={9.5} fill="#0694D3" />
			<Path
				d="M4.04688 14.9514L7.48508 7.48801L14.9485 4.0498L11.5103 11.5132L4.04688 14.9514Z"
				fill="#243F56"
			/>
			<Circle cx={9.68635} cy={9.31281} r={1.12776} fill="#0694D3" />
		</Svg>
	);
};

export default Compass;
