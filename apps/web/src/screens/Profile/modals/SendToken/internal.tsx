import { Networks } from '@walless/core';

export interface DropdownItemProps {
	id: string;
	name: string;
	value?: Networks | string;
	icon?: React.ReactNode;
	onPress?: () => void;
	isSelected?: boolean;
}

export interface DropdownProps {
	name: string;
	setValue: (value: unknown) => void;
	icon?: React.ReactNode;
	items: DropdownItemProps[];
}

export const tokens: DropdownItemProps[] = [
	{
		id: 'tk1',
		name: 'SOL',
		value: 'SOL',
		icon: '/img/send-token/icon-solana.png',
	},
	{
		id: 'tk2',
		name: 'SUI',
		value: 'SUI',
		icon: '/img/send-token/icon-sui.png',
	},
	{
		id: 'tk3',
		name: 'URG',
		value: 'SUI',
		icon: '/img/send-token/icon-urg.png',
	},
];

export const networks: DropdownItemProps[] = [
	{
		id: 'nw1',
		name: 'Solana',
		value: Networks.solana,
		icon: '/img/send-token/icon-solana.png',
	},
	{
		id: 'nw2',
		name: 'SUI',
		value: Networks.sui,
		icon: '/img/send-token/icon-sui.png',
	},
];

export const dropdownItems: Omit<
	DropdownProps & { type: string },
	'setValue'
>[] = [
	{
		name: 'Select token',
		type: 'token',
		items: tokens,
	},
	{
		name: 'Select network',
		type: 'network',
		items: networks,
	},
];
