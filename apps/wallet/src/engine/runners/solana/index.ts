import { clusterApiUrl, Connection } from '@solana/web3.js';
import { Networks } from '@walless/core';

import type { EngineConfig, Runner } from '../../types';

import type { SolanaContext } from './types';

const endpointUrl: Record<string, string> = {
	devnet: clusterApiUrl('devnet'),
	testnet: clusterApiUrl('testnet'),
	mainnet: SOLANA_CLUSTER_URL,
};

export const createSolanaRunner = (config: EngineConfig): Runner => {
	const { endpoints } = config;

	const connection = new Connection(endpointUrl[endpoints[Networks.solana]]);

	return {
		start() {},
		stop() {},
		getContext: (): SolanaContext => {
			return { connection };
		},
	};
};

export * from './types';
