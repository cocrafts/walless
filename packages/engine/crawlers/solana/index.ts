import { PublicKey } from '@solana/web3.js';
import { modules } from '@walless/ioc';
import type { PublicKeyDocument } from '@walless/store';
import { selectors } from '@walless/store';

import { setTokens } from '../../utils/token';

import { solanaCollectiblesByAddress } from './collectibles';
import type { SolanaRunner } from './shared';
import { solanaFungiblesByAddress } from './token';

export const solanaEngineRunner: SolanaRunner = {
	start: async (context) => {
		const { storage } = modules;
		const key = await storage.find<PublicKeyDocument>(selectors.solanaKeys);

		for (const item of key.docs) {
			const currentPubkey = new PublicKey(item._id);
			const fungibleTokens = await solanaFungiblesByAddress(
				context,
				currentPubkey,
			);

			setTokens(fungibleTokens);
			solanaCollectiblesByAddress({
				context,
				address: currentPubkey.toString(),
			});
		}
	},
	stop: async () => {
		console.log('stop!');
	},
};

export * from './shared';
