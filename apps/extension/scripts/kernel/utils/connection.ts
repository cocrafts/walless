import { clusterApiUrl, Connection } from '@solana/web3.js';

// Temporary solution for __DEV__
const __DEV__ = 'devnet';

const endpoint = __DEV__ ? 'devnet' : 'mainnet-beta';
export const connection = new Connection(clusterApiUrl(endpoint));
