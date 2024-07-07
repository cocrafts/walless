jest.mock('utils/storage/db');
jest.mock('utils/storage/shared', () => ({
	channels: jest.fn(),
	encryptionKeyVault: jest.fn(),
	initializeVaultKeys: jest.fn(),
}));

import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import type { SolanaCollectible } from '@walless/core';
import { Networks } from '@walless/core';
import type { NftDocument } from '@walless/store';

import { queryCollectibles, updateCollectibleToStorage } from './collectibles';
import type { SolanaContext } from './types';

const connection = new Connection(
	process.env.SOLANA_CLUSTER_URL || clusterApiUrl('devnet'),
);

const wallet = new PublicKey('H9d4gR9nG6G7bMZLfUF5cR8MuP4wMXNwsJyPfHbeVicP');

describe('[solana runner] collectibles', () => {
	test('getAndSyncCollectiblesOnChain', async () => {
		const context: SolanaContext = {
			connection,
			cluster: 'devnet',
		};
		const nfts = await queryCollectibles(
			context.connection,
			context.cluster,
			wallet,
		);

		expect(nfts).not.toBeNull();
	});

	test('updateCollectibleToStorage', async () => {
		const context: SolanaContext = {
			connection,
			cluster: 'devnet',
		};

		const result = await updateCollectibleToStorage(
			context.connection,
			context.cluster,
			exampleCollectible,
		);

		expect(result.collection).not.toBeNull();
		// expect(result.collection?.count).toEqual(1);
		expect(result.collectible).not.toBeNull();
	});

	test('updateCollectibleToStorage twice', async () => {
		const context: SolanaContext = {
			connection,
			cluster: 'devnet',
		};

		await updateCollectibleToStorage(
			context.connection,
			context.cluster,
			exampleCollectible,
		);

		const result = await updateCollectibleToStorage(
			context.connection,
			context.cluster,
			exampleCollectible,
		);

		expect(result.collection).not.toBeNull();
		expect(result.collectible).not.toBeNull();
	});

	test('updateCollectibleToStorage with stored collection', async () => {
		const context: SolanaContext = {
			connection,
			cluster: 'devnet',
		};

		const newCollectible = {
			...exampleCollectible,
			_id: 'clone-collectible',
		};

		const result = await updateCollectibleToStorage(
			context.connection,
			context.cluster,
			newCollectible,
		);

		expect(result.collection).not.toBeNull();
		expect(result.collectible).not.toBeNull();
	});
});

const exampleCollectible: NftDocument<SolanaCollectible> = {
	_id: 'H9d4gR9nG6G7bMZLfUF5cR8MuP4wMXNwsJyPfHbeVicP/collectible/ZmzsJiN4eaFpS61WkSvLRJahE4v1YebPh7nu9AzUedL',
	type: 'NFT',
	collectionId:
		'H9d4gR9nG6G7bMZLfUF5cR8MuP4wMXNwsJyPfHbeVicP/collection/3PqfGCSzkbHLrwFPsoaMwNDciRTcAnuYU5k9x4tBvKj6',
	collectionAddress: '3PqfGCSzkbHLrwFPsoaMwNDciRTcAnuYU5k9x4tBvKj6',
	network: Networks.solana,
	name: 'Number #0005',
	image:
		'https://arweave.net/4YpmywZ273XBTw8tSRC3hM-USweR8AJtPwMkWAW5DBk?ext=png',
	symbol: 'NBer',
	description:
		'Collection of 10 numbers on the blockchain. This is the number 5/10.',
	cluster: 'devnet',
	mint: 'ZmzsJiN4eaFpS61WkSvLRJahE4v1YebPh7nu9AzUedL',
	ata: '',
	owner: 'H9d4gR9nG6G7bMZLfUF5cR8MuP4wMXNwsJyPfHbeVicP',
	amount: 1,
};
