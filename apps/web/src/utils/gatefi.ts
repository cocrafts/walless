import { Linking } from 'react-native';
import { Networks } from '@walless/core';
import { keyState } from '@walless/engine';

export interface GateFiConfig {
	wallet?: string;
	cryptoCurrency?: string;
	cryptoAmount?: string;
	fiatCurrency?: string;
	fiatAmount?: string;
}

export const onrampWithGateFi = (config?: GateFiConfig) => {
	let queryString = `merchantId=${GATEFI_MERCHANT_ID}`;
	queryString += `&wallet=${config?.wallet}`;
	queryString += `&cryptoCurrency=${config?.cryptoCurrency ?? 'USDT'}`;
	queryString += `&cryptoAmount=${config?.cryptoAmount ?? '100'}`;
	queryString += `&fiatCurrency=${config?.fiatCurrency ?? 'USD'}`;
	queryString += `&fiatAmount=${config?.fiatAmount ?? '100'}`;

	const url = `https://${GATEFI_ENDPOINT}/?${queryString}`;
	Linking.openURL(url);
};

export const buyToken = (network: Networks) => {
	if (network === Networks.solana) {
		const publicKey = Array.from(keyState.map.values()).find(
			(ele) => ele.network == network,
		);
		if (publicKey) onrampWithGateFi({ wallet: publicKey._id });
	}
};
