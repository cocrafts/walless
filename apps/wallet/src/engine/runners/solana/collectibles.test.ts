jest.mock('utils/storage/db');
import { inspect } from 'util';

import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { Networks } from '@walless/core';
import type { CollectibleDocument } from '@walless/store';

import {
	getCollectiblesOnChain,
	updateCollectibleToStorage,
} from './collectibles';
import type { SolanaContext } from './types';

const connection = new Connection(clusterApiUrl('devnet'));
const wallet = new PublicKey('H9d4gR9nG6G7bMZLfUF5cR8MuP4wMXNwsJyPfHbeVicP');

describe('[solana runner] collectibles', () => {
	test('getAndSyncCollectiblesOnChain', async () => {
		const context: SolanaContext = {
			connection,
			endpoint: 'devnet',
		};
		const nfts = await getCollectiblesOnChain(
			context.connection,
			context.endpoint,
			wallet,
		);

		expect(nfts).not.toBeNull();
	});

	test('updateCollectibleToStorage', async () => {
		const context: SolanaContext = {
			connection,
			endpoint: 'devnet',
		};

		const result = await updateCollectibleToStorage(
			context.connection,
			context.endpoint,
			exampleCollectible,
		);

		expect(result.collection).not.toBeNull();
		expect(result.collection?.count).toEqual(1);
		expect(result.collectible).not.toBeNull();
	});

	test('updateCollectibleToStorage twice', async () => {
		const context: SolanaContext = {
			connection,
			endpoint: 'devnet',
		};

		await updateCollectibleToStorage(
			context.connection,
			context.endpoint,
			exampleCollectible,
		);

		const result = await updateCollectibleToStorage(
			context.connection,
			context.endpoint,
			exampleCollectible,
		);

		console.log(inspect(result));

		expect(result.collection).not.toBeNull();
		expect(result.collection?.count).toEqual(1);
		expect(result.collectible).not.toBeNull();
	});

	test('updateCollectibleToStorage with stored collection', async () => {
		const context: SolanaContext = {
			connection,
			endpoint: 'devnet',
		};

		const newCollectible = {
			...exampleCollectible,
			_id: 'clone-collectible',
		};

		const result = await updateCollectibleToStorage(
			context.connection,
			context.endpoint,
			newCollectible,
		);

		console.log(inspect(result));

		expect(result.collection).not.toBeNull();
		expect(result.collection?.count).toEqual(2);
		expect(result.collectible).not.toBeNull();
	});
});

const exampleCollectible: CollectibleDocument = {
	_id: 'H9d4gR9nG6G7bMZLfUF5cR8MuP4wMXNwsJyPfHbeVicP/collectible/ZmzsJiN4eaFpS61WkSvLRJahE4v1YebPh7nu9AzUedL',
	type: 'NFT',
	collectionId:
		'H9d4gR9nG6G7bMZLfUF5cR8MuP4wMXNwsJyPfHbeVicP/collection/3PqfGCSzkbHLrwFPsoaMwNDciRTcAnuYU5k9x4tBvKj6',
	collectionAddress: '3PqfGCSzkbHLrwFPsoaMwNDciRTcAnuYU5k9x4tBvKj6',
	network: Networks.solana,
	metadata: {
		name: 'Number #0005',
		imageUri:
			'https://arweave.net/4YpmywZ273XBTw8tSRC3hM-USweR8AJtPwMkWAW5DBk?ext=png',
		symbol: 'NBer',
		description:
			'Collection of 10 numbers on the blockchain. This is the number 5/10.',
	},
	endpoint: 'devnet',
	account: {
		mint: 'ZmzsJiN4eaFpS61WkSvLRJahE4v1YebPh7nu9AzUedL',
		owner: 'H9d4gR9nG6G7bMZLfUF5cR8MuP4wMXNwsJyPfHbeVicP',
		amount: 1,
	},
};
