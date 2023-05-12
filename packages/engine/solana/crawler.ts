import { Connection } from '@solana/web3.js';
import { PublicKeyDocument, selectors } from '@walless/store';
import { flatten } from 'lodash';

import { tokenActions } from '../state/tokens';
import { EngineRunner } from '../utils/type';

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

		tokenActions.setItems(tokenDocuments);
	},
	stop: async () => {
		console.log('stop solana');
	},
};
