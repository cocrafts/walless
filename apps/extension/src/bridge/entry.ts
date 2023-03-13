import { registerServiceWorker } from 'utils/service-worker';

import { registerMessageHandlers } from './listener';

export const injectWorkers = async (): Promise<void> => {
	await registerMessageHandlers();

	if (global.chrome?.runtime) return;

	if (__DEV__) {
		require('../../scripts/kernel');
	} else {
		await registerServiceWorker('/kernel.js', { scope: '/' });
		await registerServiceWorker('/w3a-response.js', {
			scope: '/w3a-response/',
		});
	}
};
