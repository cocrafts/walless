import { PublicKey } from '@solana/web3.js';
import { Networks } from '@walless/core';
import { PublicKeyDocument } from '@walless/store';
import { db } from 'utils/pouch';

import { solanaConnection } from './utils/connection';

export const initializeSolanaSubscriber = async () => {
	const result = await db.find({
		selector: { type: 'PublicKey', network: Networks.solana },
	});
	const keys = result.docs as PublicKeyDocument[];

	for (const key of keys) {
		const publicKey = new PublicKey(key._id);

		solanaConnection.onAccountChange(publicKey, async (info) => {
			console.log(info);
		});
	}

	// TODO: migrate bellow commented @Tuan Tran
	// keys.forEach(async (key) => {
	// 	if (key.network === 'sui') return;
	// 	const publicKey = new PublicKey(key.id as string);
	//
	// 	solanaConnection.onAccountChange(publicKey, async () => {
	// 		const wallet = await fetchSolanaWalletTokens(key.id as string);
	// 		db.wallets.put(wallet);
	//
	// 		const mintList = Object.keys(wallet.tokens);
	// 		mintList.forEach(async (mint) => {
	// 			const mintAccount = await fetchMintAccount(mint);
	// 			db.tokens.put(mintAccount);
	// 		});
	// 	});
	// });
};
