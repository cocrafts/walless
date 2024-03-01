import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const TwoPeople: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 14 10" fill="none">
			<Path
				id="Vector"
				d="M4.2 4.9C5.55406 4.9 6.65 3.80406 6.65 2.45C6.65 1.09594 5.55406 0 4.2 0C2.84594 0 1.75 1.09594 1.75 2.45C1.75 3.80406 2.84594 4.9 4.2 4.9ZM5.88 5.6H5.69844C5.24344 5.81875 4.73812 5.95 4.2 5.95C3.66187 5.95 3.15875 5.81875 2.70156 5.6H2.52C1.12875 5.6 0 6.72875 0 8.12V8.75C0 9.32969 0.470312 9.8 1.05 9.8H7.35C7.92969 9.8 8.4 9.32969 8.4 8.75V8.12C8.4 6.72875 7.27125 5.6 5.88 5.6ZM10.5 4.9C11.6594 4.9 12.6 3.95937 12.6 2.8C12.6 1.64062 11.6594 0.7 10.5 0.7C9.34062 0.7 8.4 1.64062 8.4 2.8C8.4 3.95937 9.34062 4.9 10.5 4.9ZM11.55 5.6H11.4669C11.1628 5.705 10.8413 5.775 10.5 5.775C10.1587 5.775 9.83719 5.705 9.53312 5.6H9.45C9.00375 5.6 8.5925 5.72906 8.23156 5.93687C8.76531 6.51219 9.1 7.27563 9.1 8.12V8.96C9.1 9.00812 9.08906 9.05406 9.08687 9.1H12.95C13.5297 9.1 14 8.62969 14 8.05C14 6.69594 12.9041 5.6 11.55 5.6Z"
				fill={color}
			/>
		</Svg>
	);
};

export default TwoPeople;