import { PublicKey } from '@solana/web3.js';
import { CollectibleRecord } from '@walless/storage';

import { db } from '../storage';

import { connection } from './connection';
export const fetchAllCollectibles = async (): Promise<CollectibleRecord[]> => {
	const keys = await db.publicKeys.toArray();
	const collectibles = db.collectibles;

	keys.forEach(async (key) => {
		if (key.network === 'sui') return;
		const publicKey = new PublicKey(key.id as string);
		const collectiblesByWallet = await getNftsByOwner(connection, publicKey);
		collectiblesByWallet.forEach((collectible) => {
			collectibles.put({
				id: collectible.address.toString(),
				collectionId: collectible.collection?.address.toString(),
				metadata: {
					name: collectible.name,
					symbol: collectible.symbol,
					imageUri: collectible.uri,
				},
			});
		});
	});

	return await collectibles.toArray();
};
