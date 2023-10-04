import { Networks } from '@walless/core';
import type { PublicKeyDocument, TokenDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { type Provider, HexString } from 'aptos';

import { tokenActions } from '../state/tokens';
import type { EngineRunner } from '../utils/type';

export const aptosEngineRunner: EngineRunner<Provider> = {
	start: async (context) => {
		const { connection, storage } = context;

		const keyResult = await storage.find(selectors.aptosKeys);
		const keys = keyResult.docs as PublicKeyDocument[];

		const pubkey = new HexString(keys[0]._id);

		try {
			const coinsData = await connection.getAccountCoinsData(pubkey);

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
						imageUri: coin.metadata?.icon_uri ?? '/img/network/aptos-icon.svg',
					},
				});
			});

			tokenActions.setItems(tokenDocuments);
		} catch (error) {
			console.log('--> aptos crawler', error);
		}
	},
	stop: async () => {
		// MIGHT UPDATE THIS IN THE FUTURE
	},
};
