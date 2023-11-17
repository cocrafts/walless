export interface ServiceWorkerRegistrationOptions {
	scope?: string;
	updateViaCache?: ServiceWorkerUpdateViaCache;
}

export const registerServiceWorker = async (
	workerUrl: string,
	options?: ServiceWorkerRegistrationOptions,
): Promise<ServiceWorkerRegistration> => {
	if ('serviceWorker' in navigator) {
		try {
			const reg = await navigator.serviceWorker.register(workerUrl, options);
			console.log('Service worker registered:', reg);
			return reg;
		} catch (error) {
			console.error('Service worker registration failed:', error);
			throw error;
		}
	} else {
		return Promise.reject(
			new Error('Service workers are not supported in this browser'),
		);
	}
};
