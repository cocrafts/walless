import type { Connection } from '@solana/web3.js';
import type { Endpoint } from '@walless/core';

import type { Runner } from '../../types';

export type SolanaContext = {
	connection: Connection;
};

export const createSolanaRunner = (endpoint: Endpoint): Runner => {
	console.log(endpoint);
	return {
		start() {},
		stop() {},
		getContext: (): SolanaContext => {
			return {} as SolanaContext;
		},
	};
};
