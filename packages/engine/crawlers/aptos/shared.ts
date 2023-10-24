import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import { Network, Provider } from 'aptos';
import { createConnectionPool } from '../../utils/pool';

let aptosConnection: Provider | undefined;
export const getAptosConnection = async () => {
	if (aptosConnection) return aptosConnection;
	else {
		const conn = modules.engine.getConnection(Networks.aptos) as Provider;
		aptosConnection = conn;
		return conn;
	}
};

export const aptosPool = createConnectionPool<Provider>({
	create: (id) => new Provider(aptosEndpoints[id]),
});

export const aptosEndpoints: Record<string, Network> = {
	devnet: Network.DEVNET,
	testnet: Network.TESTNET,
	mainnet: Network.MAINNET,
};
