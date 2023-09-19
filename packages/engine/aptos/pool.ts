import { Network, Provider } from 'aptos';

import { createConnectionPool } from '../utils/pool';

export const aptosPool = createConnectionPool<Provider>({
	create: (id) => {
		console.log('aptosPool create', id);
		return new Provider(aptosEndpoints[id] as Network);
	},
});

export const aptosEndpoints: Record<string, string> = {
	devnet: Network.DEVNET,
	testnet: Network.TESTNET,
	mainnet: Network.MAINNET,
};
