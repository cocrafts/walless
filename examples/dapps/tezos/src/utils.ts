import { dAppClient, network } from './bootstrap';
import { updateContext } from './context';

export const connect = async () => {
	const permissions = await dAppClient.requestPermissions({ network });
	console.log('new connection: ', permissions.address);
	updateContext({ address: permissions.address });
};
