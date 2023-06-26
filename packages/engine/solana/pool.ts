import { clusterApiUrl, Connection } from '@solana/web3.js';

import { createConnectionPool } from '../utils/pool';

export const solanaPool = createConnectionPool<Connection>({
	create: (id) => new Connection(solanaEndpoints[id]),
});

export const solanaEndpoints: Record<string, string> = {
	devnet: clusterApiUrl('devnet'),
	testnet: clusterApiUrl('testnet'),
	mainnet: 'https://nd-863-074-236.p2pify.com/0e6f78c82b1fcf2cd179a29a1dd0302e',
};
