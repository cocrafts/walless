export interface ServiceWorkerRegistrationOptions {
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
