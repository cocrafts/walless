import Walless from '@walless/sdk';
import { initialize } from '@walless/wallet-standard';

const configureWalletStandard = async (): Promise<void> => {
	const walless = new Walless();

	try {
		console.log('[walless/prod] registering wallet-standard');
		Object.defineProperty(window, 'walless', { value: walless });
	} catch {
		console.warn('Could not define Walless, namespace already taken.');
	}

	initialize(walless);
};

(async () => {
	await configureWalletStandard();
})();
