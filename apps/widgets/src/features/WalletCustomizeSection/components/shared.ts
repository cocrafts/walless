import type { FC } from 'react';
import type { ViewStyle } from 'react-native';

import type { ParticleProps } from './Background';
import { Particle01, Particle02 } from './Background';

export interface BackgroundParticle {
	Component: FC<ParticleProps>;
	style: ViewStyle;
	size: number;
}

export const particles: BackgroundParticle[] = [
	{
		Component: Particle02,
		style: {
			position: 'absolute',
		},
		size: 1200,
	},
	{
		Component: Particle01,
		style: {
			position: 'absolute',
		},
		size: 1000,
	},
];
