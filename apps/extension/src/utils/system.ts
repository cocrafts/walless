import { isDevelopment } from './config';

interface ServiceWorkerRegistrationOptions {
	scope?: string;
	updateViaCache?: ServiceWorkerUpdateViaCache;
}

export const registerServiceWorker = (
	workerUrl: string,
	options?: ServiceWorkerRegistrationOptions,
): Promise<ServiceWorkerRegistration> => {
	if ('serviceWorker' in navigator) {
		return navigator.serviceWorker
			.register(workerUrl, options)
			.then((registration) => {
				console.log('Service worker registered:', registration);
				return registration;
			})
			.catch((error) => {
				console.error('Service worker registration failed:', error);
				throw error;
			});
	} else {
		return Promise.reject(
			new Error('Service workers are not supported in this browser'),
		);
	}
};

export const configurePlatformDynamics = async (): Promise<void> => {
	if (global.chrome?.runtime) {
		require('../../scripts/popup');
	} else {
		if (isDevelopment) {
			require('../../scripts/kernel');
		} else {
			await registerServiceWorker('/kernel.js', { scope: '/' });
			console.log('worker loaded!!');
		}
	}
};
