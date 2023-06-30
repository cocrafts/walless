import { type FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import { type IconProps } from './types';

export const Twitter: FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
			<Path
				d="M43.8841 24.7748C43.9029 25.0351 43.9029 25.2955 43.9029 25.5558C43.9029 33.4958 37.7675 42.6446 26.5538 42.6446C23.0991 42.6446 19.8898 41.659 17.1902 39.9484C17.681 40.0041 18.1529 40.0227 18.6627 40.0227C21.5133 40.0227 24.1374 39.0744 26.2329 37.4566C23.5522 37.4008 21.3056 35.6715 20.5316 33.2913C20.9092 33.3471 21.2867 33.3843 21.6832 33.3843C22.2307 33.3843 22.7782 33.3099 23.2879 33.1798C20.4939 32.6219 18.3983 30.2045 18.3983 27.2851V27.2108C19.2101 27.657 20.1541 27.936 21.1545 27.9731C19.5121 26.8946 18.4361 25.0537 18.4361 22.971C18.4361 21.8553 18.7381 20.8326 19.2667 19.9401C22.2684 23.5847 26.7803 25.9648 31.8396 26.2252C31.7453 25.7789 31.6886 25.3141 31.6886 24.8492C31.6886 21.5392 34.4071 18.843 37.7863 18.843C39.542 18.843 41.1277 19.5682 42.2416 20.7397C43.6197 20.4793 44.9411 19.9773 46.1116 19.2893C45.6585 20.6839 44.6957 21.8554 43.4309 22.5992C44.658 22.4691 45.8473 22.1343 46.9423 21.6694C46.1117 22.8595 45.0734 23.9193 43.8841 24.7748Z"
				fill={color}
			/>
		</Svg>
	);
};

export default Twitter;
