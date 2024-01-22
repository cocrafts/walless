import type { Connection } from '@solana/web3.js';
import type { Endpoint } from '@walless/core';

export type SolanaContext = {
	connection: Connection;
	endpoint: Endpoint;
};
