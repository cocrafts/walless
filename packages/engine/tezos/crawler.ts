import { type TezosToolkit } from '@taquito/taquito';
import { type TokenInfo, qlClient, queries } from '@walless/graphql';
import {
	type PublicKeyDocument,
	type TokenDocument,
	selectors,
} from '@walless/store';
import { flatten } from 'lodash';

import { tokenActions } from '../state/tokens';
import { type EngineRunner } from '../utils/type';

import { type Endpoints } from './../../core/utils/commonTypes';
import { getTezosEndpointFromUnifiedEndpoint } from './pool';
import { tezosTokensByAddress } from './token';

export const tezosEngineRunner: EngineRunner<TezosToolkit> = {
	start: async ({ endpoint, connection, storage }) => {
		const keyResult = await storage.find(selectors.tezosKeys);
		const keys = keyResult.docs as PublicKeyDocument[];
		const tokenPromises = [];

		for (const key of keys) {
			tokenPromises.push(
				tezosTokensByAddress({
					endpoint: getTezosEndpointFromUnifiedEndpoint(endpoint as Endpoints),
					connection,
					address: key._id,
				}),
			);
		}

		const tokenChunks = await Promise.all(tokenPromises);
		const tokenDocuments = flatten(tokenChunks);
		const makeId = (i: TokenDocument) => `${i.network}#${i.account.address}`;
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

		tokenActions.setItems(tokenDocuments);
	},
	stop: async () => {
		console.log('stop tezos..');
	},
};
