import { Walless } from '@walless/sdk';
import { initialize } from '@walless/wallet-standard';

const configureWalletStandard = async (): Promise<void> => {
	const walless = new Walless();

	// try {
	// 	logger.info('Registering wallet-standard');
	// 	Object.defineProperty(window, 'walless', { value: walless });
	// } catch {
	// 	logger.warn('Could not define Walless, namespace already taken.');
	// }

	initialize(walless);
};

(async () => {
	await configureWalletStandard();
})();
