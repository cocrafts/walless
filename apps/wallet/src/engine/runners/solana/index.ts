import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { Networks } from '@walless/core';
import { type PublicKeyDocument, selectors } from '@walless/store';
import { addTokensToStorage, storage } from 'utils/storage';

import type { CreateFunction } from '../../types';

import { getTokenDocumentsOnChain } from './tokens';
import type { SolanaContext } from './types';

const endpointUrl: Record<string, string> = {
	devnet: clusterApiUrl('devnet'),
	testnet: clusterApiUrl('testnet'),
	mainnet: SOLANA_CLUSTER_URL,
};

export const createSolanaRunner: CreateFunction = async (config) => {
	const { endpoints } = config;
	const endpoint = endpoints[Networks.solana];
	const connection = new Connection(endpointUrl[endpoint]);
	const keys = (await storage.find<PublicKeyDocument>(selectors.solanaKeys))
		.docs;

	return {
		start: async () => {
			const promises = keys.map((key) => {
				const address = key._id;
				const walletPublicKey = new PublicKey(address);
				return [
					getTokenDocumentsOnChain(connection, endpoint, walletPublicKey).then(
						(tokens) => {
							addTokensToStorage(tokens);
						},
					),
				];
			});

			await Promise.all(promises);
		},
		stop: async () => {},
		restart: async () => {},
		getContext: (): SolanaContext => {
			return { connection };
		},
	};
};

export * from './types';
