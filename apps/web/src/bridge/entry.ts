import { runtime } from '@walless/core';
import { registerServiceWorker } from 'utils/service-worker';

export const injectRuntime = async (): Promise<void> => {
	if (runtime.isBrowser) {
		if (__DEV__) {
			require('../../scripts/kernel');
		} else {
			await registerServiceWorker('/kernel.js', { scope: '/' });
		}
	}
};
