import { PublicKey } from '@solana/web3.js';
import { logger } from '@walless/core';
import { modules } from '@walless/ioc';
import type { PublicKeyDocument } from '@walless/store';
import { addTokensToStorage, selectors } from '@walless/store';

import { solanaCollectiblesByAddress } from './collectibles';
import { historyByAddress } from './history';
import type { SolanaRunner } from './shared';
import { solanaFungiblesByAddress } from './token';

export const solanaEngineRunner: SolanaRunner = {
	start: async (context) => {
		const { storage } = modules;
		const key = await storage.find<PublicKeyDocument>(selectors.solanaKeys);

		for (const item of key.docs) {
			const address = item._id;
			const pubkey = new PublicKey(address);
			const nfts = await solanaFungiblesByAddress(context, pubkey);

			historyByAddress(context, pubkey);
			solanaCollectiblesByAddress({ context, address });
			addTokensToStorage(nfts);
		}
	},
	stop: async () => {
		logger.info('stop!');
	},
};

export * from './shared';
