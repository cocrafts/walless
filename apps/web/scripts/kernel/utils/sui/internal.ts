import { Connection, JsonRpcProvider } from '@mysten/sui.js';

export const connection = new Connection({
	fullnode: 'https://fullnode.testnet.sui.io',
	faucet: 'https://faucet.testnet.sui.io/gas',
});

export const provider = new JsonRpcProvider(connection);
