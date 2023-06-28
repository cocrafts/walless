import { type Connection } from '@solana/web3.js';
import { type TokenInfo, qlClient, queries } from '@walless/graphql';
import {
	type PublicKeyDocument,
	type TokenDocument,
	selectors,
} from '@walless/store';
import { flatten } from 'lodash';

import { tokenActions } from '../state/tokens';
import { type EngineRunner } from '../utils/type';

import { createLazySolanaMetadataFetcher } from './metadata';
import { solanaTokensByAddress } from './token';

export const solanaEngineRunner: EngineRunner<Connection> = {
	start: async ({ endpoint, connection, storage }) => {
		const lazyMetadata = createLazySolanaMetadataFetcher(storage);
		const keyResult = await storage.find(selectors.solanaKeys);
		const keys = keyResult.docs as PublicKeyDocument[];
		const tokenPromises = [];

		for (const key of keys) {
			tokenPromises.push(
				solanaTokensByAddress({
					endpoint,
					connection,
					address: key._id,
					metadataFetcher: lazyMetadata,
				}),
			);
		}

		const tokenChunks = await Promise.all(tokenPromises);
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
	},
	stop: async () => {
		console.log('stop solana');
	},
};
