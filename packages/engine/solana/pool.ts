import { clusterApiUrl, Connection } from '@solana/web3.js';

import { createConnectionPool } from '../utils/pool';

export const solanaPool = createConnectionPool<Connection>({
	create: (id) => new Connection(solanaEndpoints[id]),
});

export const solanaEndpoints: Record<string, string> = {
	devnet: clusterApiUrl('devnet'),
	testnet: clusterApiUrl('testnet'),
	mainnet: SOLANA_CLUSTER_URL,
};
