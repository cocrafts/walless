import { type Cluster, clusterApiUrl, Connection } from '@solana/web3.js';

const cluster: Cluster = __DEV__ ? 'devnet' : 'mainnet-beta';

export const connection = new Connection(clusterApiUrl(cluster));
