import type { FC } from 'react';
import {
	Defs,
	G,
	LinearGradient,
	Mask,
	Path,
	Rect,
	Stop,
	Svg,
} from 'react-native-svg';

import type { IconProps } from './types';

export const MissionBackground: FC<IconProps & { id?: number | string }> = ({
	size = 120,
	colors = ['#EC74A2', '#F4B999'],
	id = '',
}) => {
	const height = (size * 105) / 120;
	const [startColor, stopColor] = colors;

	return (
		<Svg width={size} height={height} viewBox="0 0 120 105" fill="none">
			<Rect
				width={'120'}
				height={'105'}
				rx={'15'}
				fill={`url(#paint0_linear_8718_3463${id})`}
			/>
			<G opacity={0.18}>
				<Mask
					id={`mask0_8718_3463${id}`}
					maskUnits={'userSpaceOnUse'}
					x={0}
					y={0}
					width={120}
					height={105}
				>
					<Rect
						width={120}
						height={105}
						rx={15}
						fill={`url(#paint1_linear_8718_3463${id})`}
					/>
				</Mask>
				<G mask={`url(#mask0_8718_3463${id})`}>
					<Path
						fillRule={'evenodd'}
						clipRule={'evenodd'}
						d={
							'M120.5 44C138.449 44 153 29.4493 153 11.5C153 -6.44925 138.449 -21 120.5 -21C102.551 -21 88 -6.44925 88 11.5C88 29.4493 102.551 44 120.5 44ZM120.5 36C134.031 36 145 25.031 145 11.5C145 -2.03098 134.031 -13 120.5 -13C106.969 -13 96 -2.03098 96 11.5C96 25.031 106.969 36 120.5 36Z'
						}
						fill={'#ffffff'}
					/>
					<Path
						d={
							'M55 96.5C55 120.524 35.5244 140 11.5 140C-12.5244 140 -32 120.524 -32 96.5C-32 72.4756 -12.5244 53 11.5 53C35.5244 53 55 72.4756 55 96.5Z'
						}
						fill={'#ffffff'}
					/>
				</G>
			</G>
			<Defs>
				<LinearGradient
					id={`paint0_linear_8718_3463${id}`}
					x1={10}
					y1={53}
					x2={120}
					y2={53}
					gradientUnits={'userSpaceOnUse'}
				>
					<Stop stopColor={startColor} />
					<Stop offset={1} stopColor={stopColor} />
				</LinearGradient>
				<LinearGradient
					id={`paint1_linear_8718_3463${id}`}
					x1={10}
					y1={53}
					x2={120}
					y2={53}
					gradientUnits={'userSpaceOnUse'}
				>
					<Stop stopColor={startColor} />
					<Stop offset={1} stopColor={stopColor} />
				</LinearGradient>
			</Defs>
		</Svg>
	);
};

export default MissionBackground;
