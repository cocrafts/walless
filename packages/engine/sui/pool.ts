import { Connection, JsonRpcProvider } from '@mysten/sui.js';

import { createConnectionPool } from '../utils/pool';

export const suiPool = createConnectionPool<JsonRpcProvider>({
	create: (id) => {
		const connection = new Connection(suiEndpoints[id]);
		return new JsonRpcProvider(connection);
	},
});

export const suiEndpoints: Record<string, ConnectionOptions> = {
	testnet: {
		fullnode: 'https://fullnode.testnet.sui.io',
		faucet: 'https://faucet.testnet.sui.io/gas',
	},
};

interface ConnectionOptions {
	fullnode: string;
	websocket?: string;
	faucet?: string;
}
