import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import type { Provider } from 'aptos';

let aptosConnection: Provider | undefined;
export const getAptosConnection = async () => {
	if (aptosConnection) return aptosConnection;
	else {
		const conn = modules.engine.getConnection(Networks.aptos) as Provider;
		aptosConnection = conn;
		return conn;
	}
};