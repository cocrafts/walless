import { PublicKey } from '@solana/web3.js';
import { db } from 'utils/storage';

import { solanaConnection } from './utils/connection';
import { fetchMintAccount, fetchSolanaWalletTokens } from './utils/query';

export const initializeSolanaSubscriber = async () => {
	const keys = await db.publicKeys.toArray();

	keys.forEach(async (key) => {
		if (key.network === 'sui') return;
		const publicKey = new PublicKey(key.id as string);

		solanaConnection.onAccountChange(publicKey, async () => {
			const wallet = await fetchSolanaWalletTokens(key.id as string);
			db.wallets.put(wallet);

			const mintList = Object.keys(wallet.tokens);
			mintList.forEach(async (mint) => {
				const mintAccount = await fetchMintAccount(mint);
				db.tokens.put(mintAccount);
			});
		});
	});
};
