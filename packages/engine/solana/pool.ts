import { clusterApiUrl, Connection } from '@solana/web3.js';

import { createConnectionPool } from '../utils/pool';

export const solanaPool = createConnectionPool<Connection>({
	create: (id) => new Connection(solanaEndpoints[id]),
});

export const solanaEndpoints: Record<string, string> = {
	devnet: clusterApiUrl('devnet'),
	testnet: clusterApiUrl('testnet'),
	mainnet:
		'https://broken-billowing-sanctuary.solana-mainnet.quiknode.pro/269a66566cb8bd89906698287232cf38c5cae13a/',
};
