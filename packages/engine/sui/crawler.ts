import { type JsonRpcProvider } from '@mysten/sui.js';
import { type TokenInfo, qlClient, queries } from '@walless/graphql';
import {
	type PublicKeyDocument,
	type TokenDocument,
	selectors,
} from '@walless/store';
import { flatten } from 'lodash';

import { tokenActions } from '../state/tokens';
import { type EngineRunner } from '../utils/type';

import { suiTokensByAddress } from './token';

export const suiEngineRunner: EngineRunner<JsonRpcProvider> = {
	start: async ({ endpoint, connection, storage }) => {
		const keyResult = await storage.find(selectors.suiKeys);
		const keys = keyResult.docs as PublicKeyDocument[];
		const tokenPromises = [];

		for (const key of keys) {
			tokenPromises.push(
				suiTokensByAddress({
					endpoint,
					connection,
					address: key._id,
				}),
			);
		}

		const tokenChunks = await Promise.all(tokenPromises);
		const tokenDocuments = flatten(tokenChunks);
		const makeId = (i: TokenDocument) => `${i.network}#${i.account.mint}`;

		try {
			const { tokensByAddress } = await qlClient.request<{
				tokensByAddress: TokenInfo[];
				addresses: string[];
			}>(queries.tokensByAddress, {
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
			console.log('cannot fetch sui token price');
		}

		tokenActions.setItems(tokenDocuments);
	},
	stop: async () => {
		console.log('stop sui..');
	},
};
