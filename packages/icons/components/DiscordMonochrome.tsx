import type { FC } from 'react';
import { Path, Rect, Svg } from 'react-native-svg';
import type { IconProps } from '@walless/icons';

export const DiscordMonochrome: FC<IconProps> = ({ size }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Rect width="24" height="24" rx="4" fill="white" />
			<Path
				d="M16.8598 7.58432C15.9401 7.16276 14.969 6.86387 13.9714 6.69531C13.8347 6.9394 13.7112 7.19059 13.6013 7.44782C12.5386 7.28776 11.4579 7.28776 10.3952 7.44782C10.2856 7.19061 10.1623 6.93942 10.026 6.69531C9.02788 6.86615 8.05611 7.16556 7.13494 7.58607C5.30704 10.2899 4.81179 12.928 5.05942 15.5277C6.12969 16.3188 7.32774 16.9205 8.60146 17.3066C8.88754 16.9201 9.14128 16.5106 9.36009 16.0824C8.94598 15.9277 8.5463 15.7368 8.1657 15.5119C8.26662 15.4384 8.36433 15.3652 8.45883 15.2923C9.56666 15.8133 10.7758 16.0834 12 16.0834C13.2242 16.0834 14.4333 15.8133 15.5412 15.2923C15.6374 15.3716 15.7351 15.4448 15.8343 15.5119C15.4527 15.7371 15.0522 15.9286 14.6373 16.0842C14.8551 16.5121 15.1089 16.9207 15.3959 17.3057C16.6704 16.9207 17.8693 16.3199 18.9406 15.5294C19.2311 12.5141 18.4444 9.90048 16.8598 7.58432ZM9.67335 13.9281C8.98296 13.9281 8.41333 13.3025 8.41333 12.5316C8.41333 11.7607 8.96371 11.129 9.67247 11.129C10.3812 11.129 10.9465 11.7607 10.9342 12.5316C10.922 13.3016 10.3777 13.929 9.67422 13.929M14.3258 13.929C13.6345 13.929 13.0658 13.3034 13.0658 12.5325C13.0658 11.7616 13.617 11.1299 14.3258 11.1299C15.0345 11.1299 15.5963 11.7616 15.584 12.5325C15.5718 13.3025 15.0293 13.929 14.3258 13.929Z"
				fill="#5A6B7A"
			/>
		</Svg>
	);
};

export default DiscordMonochrome;
