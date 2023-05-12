import { Networks } from '@walless/core';

export interface NetworkInfo {
	name: string;
	icon: string;
	network: Networks;
}

export const networkMap: Record<Networks, NetworkInfo> = {
	[Networks.solana]: {
		name: 'Solana',
		icon: '/img/send-token/icon-solana.png',
		network: Networks.solana,
	},
	[Networks.sui]: {
		name: 'Sui',
		icon: '/img/send-token/icon-sui.png',
		network: Networks.sui,
	},
	[Networks.ethereum]: {
		name: 'Ethereum',
		icon: '/img/send-token/icon-ethereum.png',
		network: Networks.ethereum,
	},
};

export const getNetworkInfo = (network?: Networks): NetworkInfo | undefined => {
	if (network) {
		return networkMap[network];
	}
};

export const selectors = {
	allExtensions: { selector: { type: 'Extension' } },
	allKeys: { selector: { type: 'PublicKey' } },
	solanaKeys: { selector: { type: 'PublicKey', network: Networks.solana } },
	suiKeys: { selector: { type: 'PublicKey', network: Networks.sui } },
	allTokens: { selector: { type: 'Token' } },
};
