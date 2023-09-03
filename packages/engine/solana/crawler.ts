import type { Connection } from '@solana/web3.js';
import type { TokenInfo } from '@walless/graphql';
import { queries } from '@walless/graphql';
import { modules } from '@walless/ioc';
import type { PublicKeyDocument, TokenDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { flatten } from 'lodash';

import { tokenActions } from '../state/tokens';
import type { EngineRunner } from '../utils/type';

import { solanaCollectiblesByAddress } from './collectibles';
import { initRealTimeSubscription } from './subscription';
import { solanaTokensByAddress } from './token';
import { getSignatureList, getTransactions } from './transaction';

export const solanaEngineRunner: EngineRunner<Connection> = {
	start: async (context) => {
		const { endpoint, connection } = context;
		const keyResult = await modules.storage.find(selectors.solanaKeys);
		const keys = keyResult.docs as PublicKeyDocument[];
		const tokenPromises = [];
		const promises = [];

		for (const key of keys) {
			tokenPromises.push(
				solanaTokensByAddress({
					endpoint,
					connection,
					address: key._id,
				}),
			);

			promises.push(
				solanaCollectiblesByAddress({
					endpoint,
					connection,
					address: key._id,
				}),
			);
		}

		if (keys[0]) {
			const signatures = await getSignatureList(connection, keys[0]._id);
			await getTransactions(connection, signatures, keys[0]._id);
		}

		promises.push(
			Promise.all(tokenPromises).then(async (tokenChunks) => {
				const tokenDocuments = flatten(tokenChunks);
				const makeId = (i: TokenDocument) => `${i.network}#${i.account.mint}`;

				try {
					const { tokensByAddress } = await modules.qlClient.request<
						{ tokensByAddress: TokenInfo[] },
						{ addresses: string[] }
					>(queries.tokensByAddress, {
						addresses: tokenDocuments.map(makeId),
					});

					const quoteMap = tokensByAddress.reduce((a, i) => {
						a[i.address as string] = i;
						return a;
					}, {} as Record<string, TokenInfo>);

					for (const i of tokenDocuments) {
						i.account.quotes = quoteMap[makeId(i)].quotes;
					}
				} catch (error) {
					console.log('cannot fetch solana token price', error);
				}

				tokenActions.setItems(tokenDocuments);
			}),
		);

		promises.push(initRealTimeSubscription(context, keys));
		await Promise.all(promises);
	},
	stop: async () => {
		// subscriptionList.forEach((subscriptionId) => {
		// 	connection.removeAccountChangeListener(subscriptionId);
		// });
	},
};
