import { type TezosToolkit } from '@taquito/taquito';
import { type PublicKeyDocument, selectors } from '@walless/store';
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

		tokenActions.setItems(tokenDocuments);
	},
	stop: async () => {
		console.log('stop tezos..');
	},
};
