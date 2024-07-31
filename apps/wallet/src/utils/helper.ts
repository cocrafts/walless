import type { ImageSourcePropType } from 'react-native';
import { Networks } from '@walless/core';
import numeral from 'numeral';

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
				icon: assets.setting.solana.icon,
				network: Networks.solana,
			};
		case Networks.sui:
			return {
				name: 'Sui',
				icon: assets.setting.sui.icon,
				network: Networks.sui,
			};
		case Networks.tezos:
			return {
				name: 'Tezos',
				icon: assets.setting.tezos.icon,
				network: Networks.tezos,
			};
		case Networks.aptos:
			return {
				name: 'Aptos',
				icon: assets.setting.aptos.icon,
				network: Networks.aptos,
			};
	}
};

export const isValidUrl = (str: string) => {
	const pattern = new RegExp(
		'^([a-zA-Z]+:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', // fragment locator
		'i',
	);

	return pattern.test(str);
};

export const isValidHttpUrl = (str: string) => {
	const pattern = new RegExp(
		'^(https?:\\/\\/)' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', // fragment locator
		'i',
	);

	return pattern.test(str);
};

export const getValuationDisplay = (valuation: number, isPrivate?: boolean) => {
	if (isPrivate) {
		return '∗∗∗∗∗∗';
	}

	return `$${numeral(valuation).format('0.00')}`;
};
