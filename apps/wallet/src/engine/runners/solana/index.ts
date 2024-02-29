import { PublicKey } from '@metaplex-foundation/js';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { Networks } from '@walless/core';
import type { PublicKeyDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { environment } from 'utils/config';
import {
	addTokensToStorage,
	storage,
	updateCollectibleAmountToStorage,
} from 'utils/storage';

import type { CreateFunction } from '../../types';

import {
	getCollectiblesOnChain,
	updateCollectibleToStorage,
} from './collectibles';
import { getTransactionsHistory } from './history';
import { throttle } from './internal';
import { watchAccount, watchLogs } from './subscription';
import {
	getParsedTokenAccountsByOwner,
	getTokenDocumentsOnChain,
} from './tokens';
import type { SolanaContext } from './types';

const endpointUrl: Record<string, string> = {
	devnet: clusterApiUrl('devnet'),
	testnet: clusterApiUrl('testnet'),
	mainnet: environment.SOLANA_CLUSTER_URL,
};

export const createSolanaRunner: CreateFunction = async (config) => {
	const { networkClusters } = config;
	const cluster = networkClusters[Networks.solana];
	const connection = new Connection(endpointUrl[cluster], 'confirmed');
	const keys = (await storage.find<PublicKeyDocument>(selectors.solanaKeys))
		.docs;

	return {
		start: async () => {
			const promises = keys.map(async (key) => {
				const wallet = new PublicKey(key._id);
				const accounts = await throttle(async () =>
					getParsedTokenAccountsByOwner(connection, wallet),
				)();

				return [
					getTokenDocumentsOnChain(connection, cluster, wallet, accounts).then(
						(tokens) => {
							addTokensToStorage(tokens);
						},
					),
					getCollectiblesOnChain(connection, cluster, wallet).then(
						(collectibles) => {
							collectibles.map(async (c) => {
								await updateCollectibleToStorage(connection, cluster, c);
							});
						},
					),
					...accounts.map((a) => {
						/**
						 * With collectibles, we use Metaplex for querying data,
						 * but it does not query collectibles which are removed,
						 * we need to clean it manually
						 */
						if (a.tokenAmount.decimals === 0 && a.tokenAmount.amount === '0') {
							const id = `${wallet.toString()}/collectible/${a.mint}`;
							updateCollectibleAmountToStorage(id, 0);
						}

						watchAccount(connection, cluster, wallet, a.publicKey);
					}),
					watchLogs(connection, cluster, wallet),
					watchAccount(connection, cluster, wallet, wallet),
					getTransactionsHistory(connection, cluster, wallet, accounts),
				] as never[];
			});

			await Promise.all(promises);
		},
		stop: async () => {},
		restart: async () => {},
		getContext: (): SolanaContext => {
			return { connection, cluster: cluster };
		},
	};
};

export * from './types';
