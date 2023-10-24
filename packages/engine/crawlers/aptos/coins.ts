import { Networks } from '@walless/core';
import type { TokenDocument } from '@walless/store';
import type { HexString, Provider } from 'aptos';

export const getCoins = async (provider: Provider, pubkey: HexString) => {
	const coinsData = await provider.getAccountCoinsData(pubkey);

	const tokenDocuments: TokenDocument[] = [];

	coinsData.current_fungible_asset_balances.forEach((coin) => {
		tokenDocuments.push({
			_id: coin.asset_type,
			account: {
				balance: coin.amount,
				decimals: coin.metadata?.decimals ?? 0,
				owner: pubkey.toString(),
				address: coin.asset_type,
			},
			network: Networks.aptos,
			type: 'Token',
			metadata: {
				name: coin.metadata?.name ?? 'Unknown',
				symbol: coin.metadata?.symbol ?? 'Unknown',
				imageUri:
					coin.metadata?.icon_uri ?? '/img/explore/logo-trans-aptos.svg',
			},
		});
	});

	return tokenDocuments;
};