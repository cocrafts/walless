import { type FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import { type IconProps } from './types';

export const Search: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 17 17" fill="none">
			<Path
				d="M12.4656 10.9634H11.6778L11.3986 10.6944C12.0218 9.97084 12.4772 9.1186 12.7323 8.19863C12.9875 7.27866 13.036 6.3137 12.8744 5.37281C12.4057 2.60242 10.0924 0.390087 7.30042 0.0512619C6.31886 -0.072842 5.32191 0.0291104 4.38584 0.349318C3.44977 0.669525 2.5994 1.1995 1.8998 1.89869C1.2002 2.59788 0.669917 3.44775 0.349522 4.38327C0.0291274 5.31879 -0.0728848 6.31516 0.051292 7.29614C0.390316 10.0865 2.60394 12.3985 5.37596 12.8668C6.31741 13.0283 7.28293 12.9798 8.20344 12.7249C9.12395 12.4699 9.97669 12.0147 10.7006 11.3919L10.9699 11.671V12.4582L15.2077 16.6936C15.6165 17.1021 16.2846 17.1021 16.6934 16.6936C17.1022 16.285 17.1022 15.6173 16.6934 15.2087L12.4656 10.9634ZM6.48278 10.9634C3.99992 10.9634 1.99569 8.96037 1.99569 6.47898C1.99569 3.99758 3.99992 1.99452 6.48278 1.99452C8.96563 1.99452 10.9699 3.99758 10.9699 6.47898C10.9699 8.96037 8.96563 10.9634 6.48278 10.9634Z"
				fill={color}
			/>
		</Svg>
	);
};

export default Search;
