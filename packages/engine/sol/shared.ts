import { clusterApiUrl, Connection } from '@solana/web3.js';

import { createConnectionPool } from '../utils/pool';
import type { EngineRunner, RunnerContext } from '../utils/type';

export const solanaPool = createConnectionPool<Connection>({
	create: (id) => new Connection(solanaEndpoints[id]),
});

export const solanaEndpoints: Record<string, string> = {
	devnet: clusterApiUrl('devnet'),
	testnet: clusterApiUrl('testnet'),
	mainnet: clusterApiUrl('mainnet-beta'),
};

export type SolanaRunner = EngineRunner<Connection>;
export type SolanaContext = RunnerContext<Connection>;
