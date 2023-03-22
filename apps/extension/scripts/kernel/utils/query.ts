import { PublicKey } from '@solana/web3.js';
import { getNftCollections, getNftsByOwner } from '@walless/network';
import { CollectibleRecord, CollectionRecord } from '@walless/storage';

import { db } from '../storage';

import { connection } from './connection';

interface CollectibleResult {
	collectibles: CollectibleRecord[];
	collections: CollectionRecord[];
}

export const fetchAllCollectibles = async (): Promise<CollectibleResult> => {
	const keys = await db.publicKeys.toArray();
	const collectibles = db.collectibles;
	const collections = db.collections;

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

	const collectionsKey = (await collectibles
		.orderBy('collectionId')
		.uniqueKeys()) as [];
	collectionsKey.forEach(async (key: string) => {
		const publicKey = new PublicKey(key);
		const collectionInfo = await getNftCollections(connection, publicKey);

		collections.put({
			id: key,
			metadata: {
				name: collectionInfo.name,
				symbol: collectionInfo.symbol,
				imageUri: collectionInfo.uri,
			},
		});
	});

	return {
		collectibles: await collectibles.toArray(),
		collections: await collections.toArray(),
	};
};
