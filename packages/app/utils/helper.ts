import type { ImageSourcePropType } from 'react-native';
import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';

export interface NetworkInfo {
	name: string;
	icon: ImageSourcePropType;
	network: Networks;
}

export const networkMap: Record<Networks, NetworkInfo> = {
	[Networks.solana]: {
		name: 'Solana',
		icon: modules.asset?.setting.solana.icon,
		network: Networks.solana,
	},
	[Networks.sui]: {
		name: 'Sui',
		icon: modules.asset?.setting.sui.icon,
		network: Networks.sui,
	},
	[Networks.tezos]: {
		name: 'Tezos',
		icon: modules.asset?.setting.tezos.icon,
		network: Networks.tezos,
	},
	[Networks.aptos]: {
		name: 'Aptos',
		icon: modules.asset?.setting.aptos.icon,
		network: Networks.aptos,
	},
};

export const getNetworkInfo = (network?: Networks): NetworkInfo | undefined => {
	if (network) {
		return networkMap[network];
	}
};
