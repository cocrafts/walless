import { clusterApiUrl, Connection } from '@solana/web3.js';

export const connection = new Connection(
	__DEV__
		? clusterApiUrl('devnet')
		: (process.env.SOLANA_CLUSTER_URL as string),
);
