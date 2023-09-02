import type { PublicKey } from '@solana/web3.js';
import { Keypair } from '@solana/web3.js';
import type { PublicKeyDocument } from '@walless/store';
import { selectors } from '@walless/store';

import type { SolanaRunner } from './shared';
import { throttle } from './shared';
import { getAllTokensByAddress } from './token';

export const solanaEngineRunner: SolanaRunner = {
	start: async (context) => {
		const { endpoint, connection, storage, qlClient } = context;
		// const key = await storage.find<PublicKeyDocument>(selectors.solanaKeys);
		// for (let i = 0; i < 3; i += 1) {
		// 	if (i == 2) {
		// 		getAllTokensByAddress(
		// 			context,
		// 			'BzCRgx6uKNGvzYrerC3Q1zKUQcNJrP5TEF2dpEE9B2Lb',
		// 		);
		// 	} else {
		// 		getAllTokensByAddress(context, new Keypair().publicKey.toString());
		// 	}
		// }

		const p = await getAllTokensByAddress(
			context,
			'BzCRgx6uKNGvzYrerC3Q1zKUQcNJrP5TEF2dpEE9B2Lb',
		);

		console.log(p, '<--');
		// for (const item of key.docs) {
		// 	getAllTokensByAddress(context, String(item));
		// }
	},
	stop: async () => {
		console.log('stop!');
	},
};
