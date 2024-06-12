import type { FC } from 'react';
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg';
import type { IconProps } from '@walless/icons';

export const XMonochrome: FC<IconProps> = ({ size }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Rect width="24" height="24" rx="4" fill="white" />
			<G clipPath="url(#clip0_13511_12514)">
				<Path
					d="M15.45 6.57617H17.291L13.27 11.1707L18 17.4237H14.2975L11.3955 13.6322L8.0785 17.4237H6.2345L10.5345 12.5082L6 6.57617H9.7965L12.417 10.0417L15.45 6.57617ZM14.8035 16.3232H15.823L9.241 7.61917H8.146L14.8035 16.3232Z"
					fill="#5A6B7A"
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_13511_12514">
					<Rect
						width="12"
						height="12"
						fill="white"
						transform="translate(6 6)"
					/>
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export default XMonochrome;
