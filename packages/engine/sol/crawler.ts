import type { Connection } from '@solana/web3.js';
import { selectors } from '@walless/store';
import pLimit from 'p-limit';

import type { SolanaRunner } from './shared';

export const solanaEngineRunner: SolanaRunner = {
	start: async (context) => {
		const limit = pLimit(5);
		const { endpoint, connection, storage, qlClient } = context;
		const { docs: publicKeys = [] } = await storage.find(selectors.solanaKeys);
	},
	stop: async () => {
		console.log('stop!');
	},
};
