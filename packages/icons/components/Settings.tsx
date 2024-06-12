import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Settings: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M9.5872 0.4336C9.6568 0.5688 9.6744 0.7424 9.7088 1.0896C9.7744 1.7456 9.8072 2.0736 9.9448 2.2544C10.0305 2.36666 10.1445 2.45422 10.275 2.50817C10.4055 2.56213 10.548 2.58056 10.688 2.5616C10.912 2.532 11.168 2.3232 11.6784 1.9056C11.948 1.684 12.0832 1.5736 12.228 1.5272C12.4124 1.46827 12.612 1.47822 12.7896 1.5552C12.9296 1.616 13.0536 1.7392 13.2992 1.9856L14.0144 2.7008C14.2608 2.9472 14.384 3.0704 14.4448 3.2104C14.5218 3.38804 14.5317 3.58758 14.4728 3.772C14.4264 3.9168 14.316 4.052 14.0952 4.3216C13.6768 4.8328 13.468 5.088 13.4376 5.3128C13.4189 5.45272 13.4375 5.5951 13.4916 5.72549C13.5457 5.85588 13.6333 5.96963 13.7456 6.0552C13.9256 6.1928 14.2544 6.2256 14.9112 6.2912C15.2576 6.3256 15.4312 6.3432 15.5672 6.4128C15.7388 6.50176 15.8723 6.64981 15.9432 6.8296C16 6.9712 16 7.1456 16 7.4944V8.5056C16 8.8544 16 9.0288 15.944 9.1696C15.8729 9.34995 15.7387 9.49835 15.5664 9.5872C15.4312 9.6568 15.2576 9.6744 14.9104 9.7088C14.2544 9.7744 13.9264 9.8072 13.7456 9.9448C13.6333 10.0305 13.5458 10.1445 13.4918 10.275C13.4379 10.4055 13.4194 10.548 13.4384 10.688C13.4688 10.912 13.6776 11.168 14.0952 11.6784C14.316 11.948 14.4264 12.0824 14.4728 12.228C14.5317 12.4124 14.5218 12.612 14.4448 12.7896C14.384 12.9296 14.2608 13.0528 14.0144 13.2992L13.2992 14.0136C13.0528 14.2608 12.9296 14.384 12.7896 14.444C12.612 14.521 12.4124 14.5309 12.228 14.472C12.0832 14.4256 11.948 14.3152 11.6784 14.0944C11.1672 13.6768 10.912 13.468 10.688 13.4384C10.548 13.4194 10.4055 13.4379 10.275 13.4918C10.1445 13.5458 10.0305 13.6333 9.9448 13.7456C9.8072 13.9256 9.7744 14.2536 9.7088 14.9104C9.6744 15.2576 9.6568 15.4312 9.5872 15.5664C9.49855 15.7386 9.35046 15.8727 9.1704 15.944C9.0288 16 8.8544 16 8.5056 16H7.4944C7.1456 16 6.9712 16 6.8304 15.944C6.65005 15.8729 6.50165 15.7387 6.4128 15.5664C6.3432 15.4312 6.3256 15.2576 6.2912 14.9104C6.2256 14.2544 6.1928 13.9264 6.0552 13.7456C5.96954 13.6335 5.85575 13.546 5.72536 13.492C5.59498 13.4381 5.45264 13.4196 5.3128 13.4384C5.088 13.468 4.8328 13.6768 4.3216 14.0944C4.052 14.316 3.9168 14.4264 3.772 14.4728C3.58758 14.5317 3.38804 14.5218 3.2104 14.4448C3.0704 14.384 2.9464 14.2608 2.7008 14.0144L1.9856 13.2992C1.7392 13.0528 1.616 12.9296 1.5552 12.7896C1.47822 12.612 1.46827 12.4124 1.5272 12.228C1.5736 12.0832 1.684 11.948 1.9048 11.6784C2.3232 11.1672 2.532 10.912 2.5616 10.6872C2.58042 10.5474 2.56191 10.405 2.50796 10.2746C2.45401 10.1443 2.36653 10.0305 2.2544 9.9448C2.0744 9.8072 1.7456 9.7744 1.0888 9.7088C0.7424 9.6744 0.5688 9.6568 0.4328 9.5872C0.261238 9.49824 0.127677 9.35019 0.0568001 9.1704C7.7486e-08 9.0288 0 8.8544 0 8.5056V7.4944C0 7.1456 -5.36442e-08 6.9712 0.0559999 6.8304C0.12711 6.65005 0.261292 6.50165 0.4336 6.4128C0.5688 6.3432 0.7424 6.3256 1.0896 6.2912C1.7456 6.2256 2.0744 6.1928 2.2544 6.0552C2.36667 5.96963 2.45431 5.85588 2.5084 5.72549C2.5625 5.5951 2.58113 5.45272 2.5624 5.3128C2.532 5.088 2.3224 4.8328 1.9048 4.3208C1.684 4.0512 1.5736 3.9168 1.5272 3.7712C1.46827 3.58678 1.47822 3.38724 1.5552 3.2096C1.616 3.0704 1.7392 2.9464 1.9856 2.7L2.7008 1.9856C2.9472 1.7392 3.0704 1.6152 3.2104 1.5552C3.38804 1.47822 3.58758 1.46827 3.772 1.5272C3.9168 1.5736 4.052 1.684 4.3216 1.9048C4.8328 2.3224 5.088 2.5312 5.312 2.5616C5.45217 2.58062 5.59488 2.56214 5.72558 2.50803C5.85627 2.45392 5.97029 2.36613 6.056 2.2536C6.192 2.0736 6.2256 1.7456 6.2912 1.0888C6.3256 0.7424 6.3432 0.5688 6.4128 0.4328C6.50161 0.260937 6.64968 0.127075 6.8296 0.0559999C6.9712 -5.36442e-08 7.1456 0 7.4944 0H8.5056C8.8544 0 9.0288 -5.36442e-08 9.1696 0.0559999C9.34995 0.12711 9.49835 0.261292 9.5872 0.4336ZM8 11.2C8.84869 11.2 9.66263 10.8629 10.2627 10.2627C10.8629 9.66263 11.2 8.84869 11.2 8C11.2 7.15131 10.8629 6.33737 10.2627 5.73726C9.66263 5.13714 8.84869 4.8 8 4.8C7.15131 4.8 6.33737 5.13714 5.73726 5.73726C5.13714 6.33737 4.8 7.15131 4.8 8C4.8 8.84869 5.13714 9.66263 5.73726 10.2627C6.33737 10.8629 7.15131 11.2 8 11.2Z"
				fill={color}
			/>
		</Svg>
	);
};

export default Settings;