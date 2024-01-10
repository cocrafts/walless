import type { ImageSourcePropType } from 'react-native';
import { Networks } from '@walless/core';

import assets from './assets';

export interface NetworkInfo {
	name: string;
	icon: ImageSourcePropType;
	network: Networks;
}

export const getNetworkInfo = (network: Networks): NetworkInfo | undefined => {
	switch (network) {
		case Networks.solana:
			return {
				name: 'Solana',
				icon: assets?.setting.solana.icon,
				network: Networks.solana,
			};
		case Networks.sui:
			return {
				name: 'Sui',
				icon: assets?.setting.sui.icon,
				network: Networks.sui,
			};
		case Networks.tezos:
			return {
				name: 'Tezos',
				icon: assets?.setting.tezos.icon,
				network: Networks.tezos,
			};
		case Networks.aptos:
			return {
				name: 'Aptos',
				icon: assets?.setting.aptos.icon,
				network: Networks.aptos,
			};
	}
};
