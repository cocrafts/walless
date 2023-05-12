import { type FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import { type Props } from './types';

export const Exclamation: FC<Props> = ({ size = 24, color = '#FFFFFF' }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 10 10">
			<Path
				fillRule="evenodd"
				d="M10 5C10 6.32608 9.47322 7.59785 8.53553 8.53553C7.59785 9.47322 6.32608 10 5 10C3.67392 10 2.40215 9.47322 1.46447 8.53553C0.526784 7.59785 0 6.32608 0 5C0 3.67392 0.526784 2.40215 1.46447 1.46447C2.40215 0.526784 3.67392 0 5 0C6.32608 0 7.59785 0.526784 8.53553 1.46447C9.47322 2.40215 10 3.67392 10 5ZM5.625 7.5C5.625 7.66576 5.55915 7.82473 5.44194 7.94194C5.32473 8.05915 5.16576 8.125 5 8.125C4.83424 8.125 4.67527 8.05915 4.55806 7.94194C4.44085 7.82473 4.375 7.66576 4.375 7.5C4.375 7.33424 4.44085 7.17527 4.55806 7.05806C4.67527 6.94085 4.83424 6.875 5 6.875C5.16576 6.875 5.32473 6.94085 5.44194 7.05806C5.55915 7.17527 5.625 7.33424 5.625 7.5ZM5 1.875C4.83424 1.875 4.67527 1.94085 4.55806 2.05806C4.44085 2.17527 4.375 2.33424 4.375 2.5V5C4.375 5.16576 4.44085 5.32473 4.55806 5.44194C4.67527 5.55915 4.83424 5.625 5 5.625C5.16576 5.625 5.32473 5.55915 5.44194 5.44194C5.55915 5.32473 5.625 5.16576 5.625 5V2.5C5.625 2.33424 5.55915 2.17527 5.44194 2.05806C5.32473 1.94085 5.16576 1.875 5 1.875Z"
				fill={color}
			/>
		</Svg>
	);
};

export default Exclamation;
