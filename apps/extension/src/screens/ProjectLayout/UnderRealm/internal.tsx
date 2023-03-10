import { ImageSourcePropType } from 'react-native';
import { resources } from 'utils/config';

export interface TokenMetadata {
	address: string;
	name: string;
	symbol: string;
	icon: ImageSourcePropType;
}

export type Tokens = TokenMetadata[];

export interface NftMetadata {
	address: string;
	name: string;
	price: number;
	currency: string;
	img: ImageSourcePropType;
}

export type Nfts = NftMetadata[];

export const tokens: Tokens = [
	{
		address: 'sjflksjdf',
		name: 'Under Realm Gold',
		symbol: 'URG',
		icon: resources.underRealm.urg,
	},
	{
		address: 'sjflkjdf',
		name: 'Under Realm Gold',
		symbol: 'URG',
		icon: resources.underRealm.urg,
	},
	{
		address: 'sflksjdf',
		name: 'Under Realm Gold',
		symbol: 'URG',
		icon: resources.underRealm.urg,
	},
	{
		address: 'sjfksjdf',
		name: 'Under Realm Gold',
		symbol: 'URG',
		icon: resources.underRealm.urg,
	},
];

export const nfts: Nfts = [
	{
		address: 'iosoiguo',
		name: 'Chipahua, Warcry',
		price: 30,
		currency: 'USDC',
		img: resources.underRealm.card1,
	},
	{
		address: 'osoiguo',
		name: 'Spell Thief',
		price: 30,
		currency: 'USDC',
		img: resources.underRealm.card2,
	},
	{
		address: 'isoiguo',
		name: 'Chipahua, Warcry',
		price: 30,
		currency: 'USDC',
		img: resources.underRealm.card1,
	},
	{
		address: 'iooiguo',
		name: 'Spell Thief',
		price: 30,
		currency: 'USDC',
		img: resources.underRealm.card2,
	},
	{
		address: 'iosiguo',
		name: 'Chipahua, Warcry',
		price: 30,
		currency: 'USDC',
		img: resources.underRealm.card1,
	},
];
