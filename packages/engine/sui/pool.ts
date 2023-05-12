import { Connection, JsonRpcProvider } from '@mysten/sui.js';

import { createConnectionPool } from '../utils/pool';

interface ConnectionOptions {
	fullnode: string;
	websocket?: string;
	faucet?: string;
}

export const suiPool = createConnectionPool<JsonRpcProvider>({
	create: (id) => {
		const connection = new Connection(suiEndpoints[id]);
		return new JsonRpcProvider(connection);
	},
});

export const suiEndpoints: Record<string, ConnectionOptions> = {
	devnet: {
		fullnode: 'https://fullnode.devnet.sui.io',
		faucet: 'https://faucet.devnet.sui.io/gas',
	},
	testnet: {
		fullnode: 'https://fullnode.testnet.sui.io',
		faucet: 'https://faucet.testnet.sui.io/gas',
	},
	mainnet: {
		fullnode: 'https://fullnode.mainnet.sui.io',
		faucet: 'https://faucet.mainnet.sui.io/gas',
	},
};
