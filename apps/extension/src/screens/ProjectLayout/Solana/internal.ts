import { ImageSourcePropType } from 'react-native';

export interface WalletMetadata {
	address: string;
	name?: string;
}

export interface TokenMetadata {
	address: string;
	icon?: ImageSourcePropType;
	symbol: string;
	price: number;
	currency: string;
	balance?: number;
}

export const wallets: WalletMetadata[] = [
	{
		address: 'skjf25o9dsjfj82957dsfh',
	},
	{
		address: 'skjf25o9dsfj82957dsfh',
	},
];

export const tokens: TokenMetadata[] = [
	{
		address: 'kslj1345hr098ejewt',
		symbol: 'SRM',
		price: 25,
		currency: 'USD',
		balance: 420,
	},
	{
		address: 'kslj135hr098ejewt',
		symbol: 'MNGO',
		price: 25,
		currency: 'USD',
		balance: 420,
	},
	{
		address: 'kslj1345hr098ejwt',
		symbol: 'USDC',
		price: 1,
		currency: 'USD',
		balance: 420,
	},
	{
		address: 'kslj1345hr098ejewt',
		symbol: 'SRM',
		price: 25,
		currency: 'USD',
		balance: 420,
	},
	{
		address: 'kslj135hr098ejewt',
		symbol: 'MNGO',
		price: 25,
		currency: 'USD',
		balance: 420,
	},
	{
		address: 'kslj1345hr098ejwt',
		symbol: 'USDC',
		price: 1,
		currency: 'USD',
		balance: 420,
	},
	{
		address: 'kslj1345hr098ejewt',
		symbol: 'SRM',
		price: 25,
		currency: 'USD',
		balance: 420,
	},
	{
		address: 'kslj135hr098ejewt',
		symbol: 'MNGO',
		price: 25,
		currency: 'USD',
		balance: 420,
	},
	{
		address: 'kslj1345hr098ejwt',
		symbol: 'USDC',
		price: 1,
		currency: 'USD',
		balance: 420,
	},
];
