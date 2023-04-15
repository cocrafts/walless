export interface Wallet {
	name: string;
	network: string;
	address: string;
	icon: string;
}

export const wallets: Wallet[] = [
	{
		name: 'Wallet 1',
		network: 'Sui',
		address: 'sj8h...mthu',
		icon: '/img/send-token/icon-sui.png',
	},
	{
		name: 'Wallet 2',
		network: 'Solana',
		address: 'sj8h...hi8y',
		icon: '/img/send-token/icon-solana.png',
	},
];
