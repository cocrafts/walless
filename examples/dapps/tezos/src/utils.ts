import { dAppClient, network } from './bootstrap';
import { updateContext } from './context';

export const connect = async () => {
	const permissions = await dAppClient.requestPermissions({
		network: network,
	});
	console.log('New connection: ', permissions.address);
	updateContext({ address: permissions.address });
};
