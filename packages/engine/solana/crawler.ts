import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import type { AccountChangeCallback, Connection } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import type { TokenInfo } from '@walless/graphql';
import { qlClient, queries } from '@walless/graphql';
import { solMint } from '@walless/network';
import type { PublicKeyDocument, TokenDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { flatten } from 'lodash';

import { collectibleActions } from '../state/collectibles';
import { tokenActions } from '../state/tokens';
import type { EngineRunner } from '../utils/type';

import { solanaCollectiblesByAddress } from './collectibles';
import { solanaTokensByAddress } from './token';

const subscriptionList: number[] = [];

export const solanaEngineRunner: EngineRunner<Connection> = {
	start: async ({ endpoint, connection, storage }) => {
		const keyResult = await storage.find(selectors.solanaKeys);
		const keys = keyResult.docs as PublicKeyDocument[];
		const tokenPromises = [];
		const promises = [];

		for (const key of keys) {
			tokenPromises.push(
				solanaTokensByAddress({
					endpoint,
					storage,
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

		const promises = [];
		promises.push(
			Promise.all(tokenPromises).then(async (tokenChunks) => {
				const tokenDocuments = flatten(tokenChunks);
				const makeId = (i: TokenDocument) => `${i.network}#${i.account.mint}`;

				try {
					const { tokensByAddress } = await qlClient.request<
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
				} catch (_) {
					console.log('cannot fetch solana token price');
				}

				tokenActions.setItems(tokenDocuments);
			}),
		);

		promises.push(
			Promise.all(collectiblePromises).then(async (results) => {
				collectibleActions.setCollections(
					flatten(results.map((result) => result.collections)),
				);
				collectibleActions.setCollectibles(
					flatten(results.map((result) => result.collectibles)),
				);
			}),
		);

		await Promise.all(promises);
	},
	stop: async ({ connection }) => {
		subscriptionList.forEach((subscriptionId) => {
			connection.removeAccountChangeListener(subscriptionId);
		});
	},
};
