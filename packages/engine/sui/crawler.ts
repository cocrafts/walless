import { JsonRpcProvider } from '@mysten/sui.js';
import { PublicKeyDocument, selectors } from '@walless/store';
import { flatten } from 'lodash';

import { tokenActions } from '../state/tokens';
import { EngineRunner } from '../utils/type';

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

		tokenActions.setItems(tokenDocuments);
	},
	stop: async () => {
		console.log('stop sui..');
	},
};
