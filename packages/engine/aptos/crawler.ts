import type { PublicKeyDocument } from '@walless/store';
import { selectors } from '@walless/store';
import type { Provider } from 'aptos';

import type { EngineRunner } from '../utils/type';

export const aptosEngineRunner: EngineRunner<Provider> = {
	start: async (context) => {
		const { endpoint, connection, storage, qlClient } = context;

		console.log('aptosEngineRunner start');
		console.log('--> endpoint', endpoint);
		console.log('--> connection aka provider', connection);
		console.log('--> storage', storage);
		console.log('--> qlClient', qlClient);

		const keyResult = await storage.find(selectors.aptosKeys);
		const keys = keyResult.docs as PublicKeyDocument[];

		console.log('--> keys', keys);
	},
	stop: async () => {
		// MIGHT UPDATE THIS IN THE FUTURE
	},
};
