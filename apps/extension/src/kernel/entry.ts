import { registerServiceWorker } from 'utils/service-worker';

import { registerMessageHandlers } from './listener';

export const injectWorker = async (): Promise<void> => {
	await registerMessageHandlers();

	if (__DEV__) {
		require('../../scripts/kernel');
	} else {
		await registerServiceWorker('/kernel.js', { scope: '/' });
	}
};
