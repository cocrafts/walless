import { clusterApiUrl, Connection } from '@solana/web3.js';
import { Networks } from '@walless/core';
import type { PublicKeyDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { environment } from 'utils/config';
import { addTokensToStorage, storage } from 'utils/storage';

import type { CreateFunction } from '../../types';

import {
	getCollectiblesOnChain,
	updateCollectibleToStorage,
} from './collectibles';
import { getTokenDocumentsOnChain } from './tokens';
import type { SolanaContext } from './types';

const endpointUrl: Record<string, string> = {
	devnet: clusterApiUrl('devnet'),
	testnet: clusterApiUrl('testnet'),
	mainnet: environment.SOLANA_CLUSTER_URL,
};

export const createSolanaRunner: CreateFunction = async (config) => {
	const { endpoints } = config;
	const endpoint = endpoints[Networks.solana];
	const connection = new Connection(endpointUrl[endpoint]);
	const keys = (await storage.find<PublicKeyDocument>(selectors.solanaKeys))
		.docs;

	const context = { connection, endpoint };

	return {
		start: async () => {
			const promises = keys.map((key) => {
				const walletAddress = key._id;
				return [
					getTokenDocumentsOnChain(context, walletAddress).then((tokens) => {
						addTokensToStorage(tokens);
					}),
					getCollectiblesOnChain(context, walletAddress).then(
						(collectibles) => {
							collectibles.map(async (collectible) => {
								await updateCollectibleToStorage(context, collectible);
							});
						},
					),
				] as never[];
			});

			await Promise.all(promises);
		},
		stop: async () => {},
		restart: async () => {},
		getContext: (): SolanaContext => {
			return context;
		},
	};
};

export * from './types';
