import type { ImageSourcePropType } from 'react-native';
import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';

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
				icon: modules.asset?.setting.solana.icon,
				network: Networks.solana,
			};
		case Networks.sui:
			return {
				name: 'Sui',
				icon: modules.asset?.setting.sui.icon,
				network: Networks.sui,
			};
		case Networks.tezos:
			return {
				name: 'Tezos',
				icon: modules.asset?.setting.tezos.icon,
				network: Networks.tezos,
			};
		case Networks.aptos:
			return {
				name: 'Aptos',
				icon: modules.asset?.setting.aptos.icon,
				network: Networks.aptos,
			};
	}
};

export const tabBarHeight = 52;
