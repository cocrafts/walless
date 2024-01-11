import type { Connection } from '@solana/web3.js';
import { Networks } from '@walless/core';

import { registerRunner } from '../../create';
import type { EngineConfig, Runner } from '../../types';

export type SolanaContext = {
	connection: Connection;
};

export const createSolanaRunner = (config: EngineConfig): Runner => {
	console.log(config);
	return {
		start() {},
		stop() {},
		getContext: (): SolanaContext => {
			return {} as SolanaContext;
		},
	};
};

registerRunner(Networks.solana, createSolanaRunner);
