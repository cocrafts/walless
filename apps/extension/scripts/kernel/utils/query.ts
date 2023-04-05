import { PublicKey } from '@solana/web3.js';
import {
	getNftCollections,
	getNftsByOwner,
	getTokenMetadata,
	getTokensByOwner,
} from '@walless/network';
import {
	CollectibleRecord,
	CollectionRecord,
	WalletRecord,
} from '@walless/storage';

import { db } from '../storage';

import { solanaConnection } from './connection';

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
		const collectiblesByWallet = await getNftsByOwner(
			solanaConnection,
			publicKey,
		);
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
		const collectionInfo = await getNftCollections(solanaConnection, publicKey);

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

export const fetchAllTokens = async (): Promise<WalletRecord[]> => {
	const keys = await db.publicKeys.toArray();
	const wallets = db.wallets;
	const tokens = db.tokens;
	const mintList: string[] = [];

	for (const key of keys) {
		if (key.network === 'sui') continue;

		const address = new PublicKey(key.id as string);
		const tokenAccounts = await getTokensByOwner(solanaConnection, address);
		const tokens = {};

		tokenAccounts.forEach(({ pubkey, account }) => {
			const mint = account.data.mint.toString();
			const isMintExisted = mintList.indexOf(mint) > -1;
			if (!isMintExisted) {
				mintList.push(mint);
			}

			tokens[mint] = {
				mint,
				address: pubkey.toString(),
				balance: parseInt(account.data.amount.toString()),
			};
		});

		wallets.put({
			id: key.id as string,
			network: key.network,
			tokens,
		});
	}

	mintList.forEach(async (mint) => {
		const mintPubkey = new PublicKey(mint);
		const tokenMetadata = await getTokenMetadata(solanaConnection, mintPubkey);

		tokens.put({
			id: mint,
			network: 'solana',
			metadata: {
				name: tokenMetadata?.data.name,
				symbol: tokenMetadata?.data.symbol,
				imageUri: tokenMetadata?.data.uri,
			},
		});
	});

	return await wallets.toArray();
};
