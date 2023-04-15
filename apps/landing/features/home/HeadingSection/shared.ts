import { FC } from 'react';
import { ViewStyle } from 'react-native';
import {
	ParticleProps,
	Walless02,
	Walless03,
	WallessLight01,
	WallessLight02,
} from 'components/icons/Walless';

export interface BackgroundIconParticle {
	Component: FC<ParticleProps>;
	style: ViewStyle;
	size: number;
}

export const particles: BackgroundIconParticle[] = [
	{
		Component: Walless02,
		style: {
			position: 'absolute',
			left: -30,
			bottom: 100,
			opacity: 0.4,
		},
		size: 1000,
	},
	{
		Component: Walless03,
		style: {
			position: 'absolute',
			top: -50,
			right: 56,
			opacity: 0.5,
		},
		size: 760,
	},
	{
		Component: Walless02,
		style: {
			position: 'absolute',
			top: 0,
			right: -30,
			opacity: 0.2,
		},
		size: 500,
	},
	{
		Component: WallessLight01,
		style: {
			position: 'absolute',
			top: -70,
			right: -300,
			opacity: 1,
		},
		size: 800,
	},
	{
		Component: WallessLight02,
		style: {
			position: 'absolute',
			top: 30,
			right: -150,
			opacity: 1,
		},
		size: 800,
	},
];

export const features = [
	'Project focus',
	'Remove seed phrase',
	'Unified cross-chain UI',
	'Runtime embedded Dapps',
];
