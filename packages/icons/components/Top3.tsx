import type { FC } from 'react';
import { Circle, G, Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Top3: FC<IconProps> = ({ size = 79 }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 79 79" fill="none">
			<Circle
				cx="39.5"
				cy="39.5"
				r="38.5"
				fill="#131C24"
				stroke="#60CDFE"
				strokeWidth="2"
			/>
			<G clipPath="url(#clip0_12822_6198)">
				<Path
					d="M30.9672 68.3682C30.6598 69.0844 29.6876 69.1893 29.2346 68.5551L25.6492 63.5366C25.4331 63.2341 25.067 63.0764 24.6986 63.1273L18.7544 63.9489C17.9833 64.0555 17.3915 63.2792 17.6985 62.564L27.7239 39.2053C27.9428 38.6952 28.5354 38.461 29.0439 38.6837L40.4786 43.6901C40.9819 43.9104 41.2131 44.4956 40.9964 45.0005L30.9672 68.3682Z"
					fill="#7E490C"
				/>
				<Path
					d="M49.0292 68.3686C49.3365 69.0847 50.3084 69.1898 50.7617 68.556L54.351 63.5362C54.5672 63.2339 54.9332 63.0764 55.3014 63.1273L61.2459 63.9489C62.017 64.0555 62.6088 63.2792 62.3018 62.564L52.2764 39.2053C52.0575 38.6952 51.4649 38.461 50.9564 38.6837L39.5216 43.6901C39.0183 43.9105 38.7871 44.4955 39.0037 45.0004L49.0292 68.3686Z"
					fill="#7E490C"
				/>
				<Path
					d="M62.3783 32.6019C62.3783 35.5149 59.6887 37.8698 58.6482 40.4034C57.5689 43.0286 57.7848 46.6044 55.8248 48.5842C53.8647 50.564 50.3246 50.346 47.7256 51.4361C45.2173 52.4871 42.8904 55.2039 40.0021 55.2039C37.1139 55.2039 34.7869 52.4871 32.2786 51.4361C29.6797 50.346 26.1395 50.564 24.1795 48.5842C22.2195 46.6044 22.4354 43.0286 21.3561 40.4034C20.3156 37.8698 17.626 35.5149 17.626 32.6019C17.626 29.6889 20.3156 27.3341 21.3561 24.8005C22.4354 22.1753 22.2195 18.5995 24.1795 16.6197C26.1395 14.6399 29.6797 14.8579 32.2786 13.7677C34.7869 12.7168 37.1139 10 39.9978 10C42.8817 10 45.213 12.7168 47.7213 13.7677C50.3203 14.8579 53.8604 14.6399 55.8204 16.6197C57.7805 18.5995 57.5646 22.1753 58.6439 24.8005C59.6844 27.3341 62.374 29.6889 62.374 32.6019H62.3783Z"
					fill="#C39151"
				/>
				<Path
					d="M57.5733 32.6019C57.5733 42.4049 49.7073 50.3503 40.0022 50.3503C30.2971 50.3503 22.4268 42.4049 22.4268 32.6019C22.4268 22.7989 30.2927 14.8535 39.9979 14.8535C49.703 14.8535 57.5689 22.7989 57.5689 32.6019H57.5733Z"
					fill="#AD7331"
				/>
				<Path
					d="M39.9977 49.0944C30.9962 49.0944 23.6699 41.6985 23.6699 32.6019C23.6699 23.5053 30.9962 16.1138 39.9977 16.1138C48.9991 16.1138 56.3254 23.5097 56.3254 32.6062C56.3254 41.7028 49.0034 49.0987 39.9977 49.0987V49.0944ZM39.9977 16.8551C31.4021 16.8551 24.4038 23.9196 24.4038 32.6062C24.4038 41.2929 31.3977 48.3574 39.9977 48.3574C48.5976 48.3574 55.5915 41.2929 55.5915 32.6062C55.5915 23.9196 48.5976 16.8551 39.9977 16.8551Z"
					fill="white"
				/>
				<Path
					d="M39.9915 39C39.1056 39 38.3504 38.8986 37.7257 38.6958C37.1011 38.4817 36.59 38.2113 36.1925 37.8845C35.795 37.5465 35.4997 37.1916 35.3066 36.8197C35.1136 36.4366 35.0114 36.0704 35 35.7211C35 35.6197 35.0341 35.5352 35.1022 35.4676C35.1817 35.4 35.2726 35.3662 35.3748 35.3662H37.5894C37.7257 35.3662 37.8336 35.3944 37.9131 35.4507C37.9926 35.4958 38.0664 35.5746 38.1346 35.6873C38.2254 35.9014 38.356 36.0761 38.5264 36.2113C38.7081 36.3465 38.9239 36.4423 39.1738 36.4986C39.4236 36.5437 39.6962 36.5662 39.9915 36.5662C40.5707 36.5662 41.0193 36.4366 41.3373 36.1775C41.6667 35.907 41.8313 35.5408 41.8313 35.0789C41.8313 34.5944 41.678 34.2507 41.3714 34.0479C41.0647 33.8338 40.6275 33.7268 40.0596 33.7268H38.1687C38.0437 33.7268 37.9415 33.6873 37.862 33.6085C37.7825 33.5296 37.7428 33.4282 37.7428 33.3042V32.3577C37.7428 32.2225 37.7712 32.1042 37.8279 32.0028C37.8847 31.9014 37.9472 31.8282 38.0153 31.7831L40.8092 29.4338H36.0733C35.9597 29.4338 35.8575 29.3944 35.7666 29.3155C35.6871 29.2366 35.6474 29.1352 35.6474 29.0113V27.4225C35.6474 27.2986 35.6871 27.1972 35.7666 27.1183C35.8575 27.0394 35.9597 27 36.0733 27H43.9097C44.0346 27 44.1369 27.0394 44.2164 27.1183C44.3072 27.1972 44.3526 27.2986 44.3526 27.4225V28.8592C44.3526 28.9831 44.3242 29.0958 44.2675 29.1972C44.2107 29.2873 44.1482 29.3606 44.0801 29.4169L41.4906 31.8L41.6099 31.8338C42.2572 31.9127 42.8365 32.0873 43.3475 32.3577C43.8586 32.6169 44.2618 32.9831 44.5571 33.4563C44.8524 33.9296 45 34.5324 45 35.2648C45 36.031 44.7785 36.6958 44.3356 37.2592C43.904 37.8113 43.3135 38.2394 42.5639 38.5437C41.8143 38.8479 40.9568 39 39.9915 39Z"
					fill="#131C24"
				/>
				<Path
					d="M39.9915 39C39.1056 39 38.3504 38.8986 37.7257 38.6958C37.1011 38.4817 36.59 38.2113 36.1925 37.8845C35.795 37.5465 35.4997 37.1916 35.3066 36.8197C35.1136 36.4366 35.0114 36.0704 35 35.7211C35 35.6197 35.0341 35.5352 35.1022 35.4676C35.1817 35.4 35.2726 35.3662 35.3748 35.3662H37.5894C37.7257 35.3662 37.8336 35.3944 37.9131 35.4507C37.9926 35.4958 38.0664 35.5746 38.1346 35.6873C38.2254 35.9014 38.356 36.0761 38.5264 36.2113C38.7081 36.3465 38.9239 36.4423 39.1738 36.4986C39.4236 36.5437 39.6962 36.5662 39.9915 36.5662C40.5707 36.5662 41.0193 36.4366 41.3373 36.1775C41.6667 35.907 41.8313 35.5408 41.8313 35.0789C41.8313 34.5944 41.678 34.2507 41.3714 34.0479C41.0647 33.8338 40.6275 33.7268 40.0596 33.7268H38.1687C38.0437 33.7268 37.9415 33.6873 37.862 33.6085C37.7825 33.5296 37.7428 33.4282 37.7428 33.3042V32.3577C37.7428 32.2225 37.7712 32.1042 37.8279 32.0028C37.8847 31.9014 37.9472 31.8282 38.0153 31.7831L40.8092 29.4338H36.0733C35.9597 29.4338 35.8575 29.3944 35.7666 29.3155C35.6871 29.2366 35.6474 29.1352 35.6474 29.0113V27.4225C35.6474 27.2986 35.6871 27.1972 35.7666 27.1183C35.8575 27.0394 35.9597 27 36.0733 27H43.9097C44.0346 27 44.1369 27.0394 44.2164 27.1183C44.3072 27.1972 44.3526 27.2986 44.3526 27.4225V28.8592C44.3526 28.9831 44.3242 29.0958 44.2675 29.1972C44.2107 29.2873 44.1482 29.3606 44.0801 29.4169L41.4906 31.8L41.6099 31.8338C42.2572 31.9127 42.8365 32.0873 43.3475 32.3577C43.8586 32.6169 44.2618 32.9831 44.5571 33.4563C44.8524 33.9296 45 34.5324 45 35.2648C45 36.031 44.7785 36.6958 44.3356 37.2592C43.904 37.8113 43.3135 38.2394 42.5639 38.5437C41.8143 38.8479 40.9568 39 39.9915 39Z"
					fill="white"
				/>
			</G>
		</Svg>
	);
};

export default Top3;
