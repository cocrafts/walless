import { PublicKey } from '@metaplex-foundation/js';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { Networks } from '@walless/core';
import { type PublicKeyDocument, selectors } from '@walless/store';
import { addTokensToStorage, storage } from 'utils/storage';

import type { CreateFunction } from '../../types';

import {
	getCollectiblesOnChain,
	updateCollectibleToStorage,
} from './collectibles';
import { watchAccount } from './subscription';
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
				const wallet = new PublicKey(key._id);
				return [
					getTokenDocumentsOnChain(connection, endpoint, wallet).then(
						(tokens) => {
							addTokensToStorage(tokens);
							tokens.map((ele) => {
								watchAccount(
									connection,
									endpoint,
									new PublicKey(wallet),
									new PublicKey(ele.account.address as string),
								);
							});
						},
					),
					getCollectiblesOnChain(connection, endpoint, wallet).then(
						(collectibles) => {
							collectibles.map(async (collectible) => {
								await updateCollectibleToStorage(
									connection,
									endpoint,
									collectible,
								);
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
			return { connection, endpoint };
		},
	};
};

export * from './types';
