jest.mock('utils/storage/db');
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';

import { getCollectiblesOnChain } from './collectibles';
import type { SolanaContext } from './types';

const connection = new Connection(clusterApiUrl('devnet'));
const wallet = new PublicKey('H9d4gR9nG6G7bMZLfUF5cR8MuP4wMXNwsJyPfHbeVicP');

describe('[solana runner] collectibles', () => {
	test('getAndSyncCollectiblesOnChain', async () => {
		const context: SolanaContext = {
			connection,
			endpoint: 'devnet',
		};
		const nfts = await getCollectiblesOnChain(context, wallet.toString());

		expect(nfts).not.toBeNull();
	});
});
