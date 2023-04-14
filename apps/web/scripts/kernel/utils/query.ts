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

		const wallet = await fetchSolanaWalletTokens(key.id as string);
		const tokenMint = Object.keys(wallet.tokens);
		tokenMint.filter((mint) => !mintList.includes(mint));
		mintList.concat(tokenMint);
		wallets.put(wallet);
	}

	mintList.forEach(async (mint) => {
		const mintAccount = await fetchMintAccount(mint);

		tokens.put(mintAccount);
	});

	return await wallets.toArray();
};

export const fetchSolanaWalletTokens = async (address: string) => {
	const publicKey = new PublicKey(address);
	const tokenAccounts = await getTokensByOwner(solanaConnection, publicKey);
	const tokens: Record<string, never> = {};

	tokenAccounts.forEach(({ pubkey, account }) => {
		const mint = account.data.mint.toString();
		tokens[mint] = {
			mint,
			address: pubkey.toString(),
			balance: parseInt(account.data.amount.toString()),
		} as never;
	});

	return {
		id: address,
		network: 'solana',
		tokens,
	};
};

export const fetchMintAccount = async (mint: string) => {
	const mintPubkey = new PublicKey(mint);
	const tokenMetadata = await getTokenMetadata(solanaConnection, mintPubkey);

	return {
		id: mint,
		network: 'solana',
		metadata: {
			name: tokenMetadata?.data.name,
			symbol: tokenMetadata?.data.symbol,
			imageUri: tokenMetadata?.data.uri,
		},
	};
};
