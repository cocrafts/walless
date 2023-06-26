import { clusterApiUrl, Connection } from '@solana/web3.js';

const endpoint = __DEV__
	? clusterApiUrl('devnet')
	: 'https://nd-863-074-236.p2pify.com/0e6f78c82b1fcf2cd179a29a1dd0302e';

export const connection = new Connection(endpoint);
