export interface DropdownItemProps {
	id: string;
	name: string;
	icon?: React.ReactNode;
	onPress?: () => void;
	isSelected?: boolean;
}

export interface DropdownProps {
	name: string;
	icon?: React.ReactNode;
	items: DropdownItemProps[];
}

export const tokens: DropdownItemProps[] = [
	{
		id: 'tk1',
		name: 'SOL',
		icon: '/img/send-token/icon-solana.png',
	},
	{
		id: 'tk2',
		name: 'SUI',
		icon: '/img/send-token/icon-sui.png',
	},
	{
		id: 'tk3',
		name: 'URG',
		icon: '/img/send-token/icon-urg.png',
	},
];

export const networks: DropdownItemProps[] = [
	{
		id: 'nw1',
		name: 'Solana',
		icon: '/img/send-token/icon-solana.png',
	},
	{
		id: 'nw2',
		name: 'SUI',
		icon: '/img/send-token/icon-sui.png',
	},
];

export const mockDropdownItems: DropdownProps[] = [
	{
		name: 'Select token',
		items: tokens,
	},
	{
		name: 'Select network',
		items: networks,
	},
];
