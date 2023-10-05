import type { SuiObjectResponse } from '@mysten/sui.js';
import { modules } from '@walless/ioc';
import type { PublicKeyDocument, TokenDocument } from '@walless/store';
import { selectors } from '@walless/store';

import { tokenActions } from '../../state/token';
import { getTokenQuotes, makeHashId } from '../../utils/api';

import type { SuiRunner } from './shared';
import { suiTokenSubscribe, suiTokenUnsubscribe } from './subscription';
import { getTokenDocument } from './token';

export const suiEngineRunner: SuiRunner = {
	start: async (context) => {
		const { storage } = modules;
		const { connection } = context;
		const key = await storage.find<PublicKeyDocument>(selectors.suiKeys);

		for (const item of key.docs) {
			const owner = item._id;
			const { data: allCoins } = await connection.getAllCoins({ owner });
			let allObjects: SuiObjectResponse[] = [];

			if (allCoins.length === 0) {
				allCoins.push({ balance: '0', coinType: suiCoinType } as never);
				allObjects.push({
					data: { type: `0x2::coin::Coin<${suiCoinType}>` } as never,
				});
			} else {
				allObjects = await connection.multiGetObjects({
					ids: allCoins.map((item) => item.coinObjectId),
					options: { showType: true, showDisplay: true },
				});
			}

			const docPromises: Promise<TokenDocument>[] = new Array(allCoins.length);

			for (let i = 0; i < allCoins.length; i += 1) {
				const coin = allCoins[i];
				const object = allObjects[i];

				docPromises[i] = getTokenDocument(
					context,
					owner,
					coin,
					object?.data as never,
				);
			}

			const tokenDocs = await Promise.all(docPromises);
			const quotes = await getTokenQuotes(tokenDocs);

			for (const item of tokenDocs) {
				item.account.quotes = quotes[makeHashId(item)].quotes;
			}

			tokenActions.setItems(tokenDocs);

			suiTokenSubscribe(connection, owner);
		}
	},
	stop: async () => {
		console.log('stop!');
		suiTokenUnsubscribe();
	},
};

export * from './shared';
