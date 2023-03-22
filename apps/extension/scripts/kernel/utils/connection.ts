import { clusterApiUrl, Connection } from '@solana/web3.js';

const endpoint = __DEV__ ? 'devnet' : 'mainnet-beta';
export const connection = new Connection(clusterApiUrl(endpoint));
